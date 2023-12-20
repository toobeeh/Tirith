import { Resolvable, minutes } from "@nestjs/throttler";

interface throttleConfig {
    limit: Resolvable<number>;
    ttl: Resolvable<number>;
    name: string;
    description: string;
}

/**
 * Rate limit config: 5 / 5 hours
 * Use for requests that alter metrics which are noremaly seldom used.
 */
export const throttleFivePerFiveHours: throttleConfig = {
    name: "throttleFivePerFiveHours",
    limit: 10,
    ttl: minutes(60) * 24,
    description: "Requests that alter metrics which are seldom used in normal usage"
};

/**
 * Rate limit config: 10 / 10 mins
 * Use for requests that access costy external ressources.
 */
export const throttleTenPerTenMinutes: throttleConfig = {
    name: "throttleTenPerTenMinutes",
    limit: 10,
    ttl: minutes(10),
    description: "Requests that access costy external ressources"
};

/**
 * Rate limit config: 10 / minute
 * Use for classical get-resources
 */
export const throttleTenPerMinute: throttleConfig = {
    name: "throttleTenPerMinute",
    limit: 10,
    ttl: minutes(1),
    description: "Requests for regular get-ish resources"
};

/**
 * Mapping of all throttle configs
 */
export const throttles = {
    throttleFivePerFiveHours,
    throttleTenPerMinute,

    /* default throttle */
    default: throttleTenPerMinute
};

/**
 * Gets the throttle configuration using reflect
 * @param target the object to be applied on
 * @returns recognized metadata or default config
 */
export const getThrottleOfControllerOrEndpoint = (target: any) => {
    const key = "THROTTLER:TTL";

    const name = (Reflect.getMetadataKeys(target).find(k => (k as string).startsWith(key)) as string | undefined)?.replace(key, "");
    if (!name) return throttles.default;

    const throttleMatch = Object.entries(throttles).find(t => t[0] == name);
    if (!throttleMatch) return throttles.default;

    return throttleMatch[1] as unknown as throttleConfig;
}