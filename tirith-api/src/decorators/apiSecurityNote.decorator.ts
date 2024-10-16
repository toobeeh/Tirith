import {getThrottleOfControllerOrEndpoint} from "src/guards/trottleConfigs";
import {AuthRole, MembershipEnum} from "./roles.decorator";
import {MemberFlagDto} from "../modules/palantir/dto/member.dto";

/**
 * Adds security details for a controller to the swagger description.
 * Should be added at the very top of all other decorators to ensure all metadata is present.
 */
export const ApiSecurityNotes = (): ClassDecorator => {
    return (target: any) => {

        /* get role requirement for class */
        const role = Reflect.getMetadata("guardRequiredRole", target) as AuthRole[] ?? [MembershipEnum.None];

        /* get throttle for class */
        const controllerThrottles = getThrottleOfControllerOrEndpoint(target) ?? [];

        /* get methods that are a path in the controller -> endpoint */
        const methods = Object.getOwnPropertyNames(target.prototype)
            .map(p => target.prototype[p])
            .map(t => ({ target: t, meta: Reflect.getMetadataKeys(t) }))
            .filter(t => t.meta.includes("path") && t.meta.includes("method"));

        methods.forEach(method => {

            /* get method specific security */
            const methodRoles = Reflect.getMetadata("guardRequiredRole", method.target) as AuthRole[] ?? role;
            const ownerOverride = Reflect.getMetadata("guardResourceOwner", method.target) as string ?? null;
            const existingMetadata = Reflect.getMetadata('swagger/apiOperation', method.target) || {};

            const endpointThrottles = getThrottleOfControllerOrEndpoint(method.target) ?? [];

            controllerThrottles.forEach(t => {
                if (!endpointThrottles.some(rt => t.name == rt.name)) endpointThrottles.push(t);
            });

            if (!methodRoles && endpointThrottles.length == 0) return;

            //console.log(method.target, endpointThrottles, controllerThrottles);

            let description = "";

            /* build security information */
            if (methodRoles && methodRoles.length > 0) {
                const roleNames = methodRoles.map(role => role).join(" | ");
                let rolesDesc = `Required Roles: ${ roleNames }`;
                if (ownerOverride != null) rolesDesc += `\n- \Role override if {${ownerOverride}} matches the client login.`;
                description += "\n\n" + rolesDesc;
            }

            /* build ratelimit information */
            if (endpointThrottles && endpointThrottles.length > 0) {

                const throttleDesc = endpointThrottles.map(t => `Rate limit ${t.name}: ${t.limit} Requests / ${t.ttl} ms TTL`);
                description += "\n\n" + throttleDesc;
            }

            /* add info to swagger description */
            Reflect.defineMetadata('swagger/apiOperation', {
                ...existingMetadata,
                description: (existingMetadata.description ?? "") + description,
            }, method.target);
        });
    };
};