import { ApiProperty, ApiPropertyOptions } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";

/**
 * interface that enforces a function as type to comply both swagger and classtransformer
 */
interface strictTypeOptions extends ApiPropertyOptions {
    // eslint-disable-next-line @typescript-eslint/ban-types
    type?: Function;
}

/**
 * Decorates an api property with swagger annotations and automatically adds 
 * class-transformer's expose and type annotations
 * @param options swagger api property properties
 * @param expose whether to expose this field
 * @returns a factory function that combines the decorators
 */
export const XApiProperty = (options?: strictTypeOptions, expose = true) => {

    const swaggerMetadataDecorator = ApiProperty(options);
    const exposeDecorator = expose === true ? Expose() : undefined;
    const typeDecorator = options?.type ? Type(() => options.type()) : undefined;

    return (target: object, key: string | symbol) => {
        swaggerMetadataDecorator(target, key);
        exposeDecorator?.(target, key);
        typeDecorator?.(target, key);
    }
}