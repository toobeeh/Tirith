import { getThrottleOfControllerOrEndpoint } from "src/guards/trottleConfigs";
import { AuthRoles } from "./roles.decorator";

/**
 * Adds security details for a controller to the swagger description.
 * Should be added at the very top of all other decorators to ensure all metadata is present.
 */
export const ApiSecurityNotes = (): ClassDecorator => {
    return (target: any) => {

        /* get role requirement for class */
        const role = Reflect.getMetadata("guardRequiredRole", target) as AuthRoles ?? AuthRoles.None;

        /* get throttle for class */
        const controllerThrottle = getThrottleOfControllerOrEndpoint(target);

        /* get methods that are a path in the controller -> endpoint */
        const methods = Object.getOwnPropertyNames(target.prototype)
            .map(p => target.prototype[p])
            .map(t => ({ target: t, meta: Reflect.getMetadataKeys(t) }))
            .filter(t => t.meta.includes("path") && t.meta.includes("method"));

        methods.forEach(method => {

            /* get method specific security */
            const methodRole = Reflect.getMetadata("guardRequiredRole", method.target) as AuthRoles ?? role;
            const ownerOverride = Reflect.getMetadata("guardResourceOwner", method.target) as string ?? null;
            const existingMetadata = Reflect.getMetadata('swagger/apiOperation', method.target) || {};

            const endpointThrottle = getThrottleOfControllerOrEndpoint(method.target) ?? controllerThrottle;

            if (!methodRole && !endpointThrottle) return;

            let description = "";

            /* build security information */
            if (methodRole) {
                let rolesDesc = `Required Role: ${AuthRoles[methodRole]}`;
                if (ownerOverride != null) rolesDesc += `\n\Role override if {${ownerOverride}} matches the client login.`;
                description += "\n\n" + rolesDesc;
            }

            /* build ratelimit information */
            if (endpointThrottle) {
                const throttleDesc = `Rate limit: ${endpointThrottle.limit} (Limit) / ${endpointThrottle.ttl} (TTL)`;
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