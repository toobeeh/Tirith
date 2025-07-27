import {Resolvable, ThrottlerOptions, minutes, days} from "@nestjs/throttler";

interface throttleConfig {
    limit: Resolvable<number>;
    ttl: Resolvable<number>;
    description: string;
}

/**
 * Rate limit config: 100 / day
 * Use for requests that alter metrics which are noremaly seldom used.
 */
const throttleHundredPerDay: throttleConfig = {
    limit: 100,
    ttl: days(1),
    description: "Requests that alter metrics which are seldom used in normal usage"
};

/**
 * Rate limit config: 10 / 10 mins
 * Use for requests that access costy external ressources.
 */
const throttleTenPerTenMinutes: throttleConfig = {
    limit: 10,
    ttl: minutes(10),
    description: "Requests that access costy external ressources"
};

/**
 * Rate limit config: 10 / minute
 * Use for classical get-resources
 */
const throttleTenPerMinute: throttleConfig = {
    limit: 10,
    ttl: minutes(1),
    description: "Requests for regular get-ish resources"
};

/**
 * Rate limit config: 30 / minute
 * Use for frequently used resources
 */
const throttleThirtyPerMinute: throttleConfig = {
    limit: 30,
    ttl: minutes(1),
    description: "Requests for more frequently used resources"
};

/**
 * Rate limit config: 100 / minute
 * Use for public resources/config that are often fetched
 */
const throttleHundredPerMinute: throttleConfig = {
    limit: 100,
    ttl: minutes(1),
    description: "Requests for public resources/config that are often fetched"
};

/**
 * collection of all throttle configs
 */
const throttles = {
    throttleFivePerFiveHours: throttleHundredPerDay,
    throttleTenPerMinute,
    throttleTenPerTenMinutes,
    throttleThirtyPerMinute,
    throttleHundredPerMinute,

    /* default throttle */
    default: throttleTenPerMinute
};

/** key type to access values in the throttle collection */
type throttleConfigName = keyof typeof throttles;

/**
 * Get a throttle config for a definitoion name
 * Used eg at controllers and endpoints
 * @param throttleConfigName the name of the throttle config which should be loaded
 * @param throttleDefinition the throttle definition name which the config will override
 * @returns object which can be applied in endpoints or controllers
 */
export const getThrottleForDefinition = (throttleConfigName: throttleConfigName = "default", throttleDefinition = "default") => {
    const config = throttles[throttleConfigName];
    const throttleConfigObject: { [name: string]: throttleConfig } = Object.defineProperty({}, throttleDefinition, { value: config, enumerable: true });
    return throttleConfigObject;
};

/**
 * Gets a default configuration for a new throttle definition
 * @param throttleConfigName the throttleconfig which will be applied
 * @param throttleDefinition the name of the created throttle definition
 * @returns an object which contains the definition name and configuration
 */
export const getThrottleDefinition = (throttleConfigName: throttleConfigName = "default", throttleDefinition = "default"): ThrottlerOptions => {
    const config = throttles[throttleConfigName];
    return { ...config, name: throttleDefinition };
};

/**
 * Gets the throttle configuration using reflect
 * @param target the object to be applied on
 * @returns recognized metadata or default config
 */
export const getThrottleOfControllerOrEndpoint = (target: any) => {
    const key_ttl = "THROTTLER:TTL";
    const key_limit = "THROTTLER:LIMIT";

    const names: string[] = (Reflect.getMetadataKeys(target).filter(k => (k as string).startsWith(key_ttl))).map(name => name.replace(key_ttl, ""));
    if (names.length == 0) return [getThrottleDefinition()];

    const throttleMatches = names.map(name => ({
        name,
        ttl: Reflect.getMetadata(key_ttl + name, target) as number,
        limit: Reflect.getMetadata(key_limit + name, target) as number,
    }));

    return throttleMatches;
}