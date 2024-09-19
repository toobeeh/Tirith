import { ApiProperty, ApiPropertyOptions } from "@nestjs/swagger";
import { Expose, Transform, Type } from "class-transformer";
import {
    IsBoolean,
    IsDefined,
    IsNumber,
    IsString,
    ValidateNested,
    isBoolean,
    isBooleanString,
    IsOptional
} from "class-validator";

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
export const XApiProperty = (options?: strictTypeOptions, expose = true): PropertyDecorator => {

    const swaggerMetadataDecorator = ApiProperty(options);
    const exposeDecorator = expose === true ? Expose() : undefined;
    const typeDecorator = options?.type ? Type(() => options.type()) : undefined;

    const defaultTypeValidators = [];

    return (target: object, key: string | symbol) => {
        swaggerMetadataDecorator(target, key);
        exposeDecorator?.(target, key);
        typeDecorator?.(target, key);

        /* add default validators */
        const propertyType = Reflect.getMetadata("design:type", target, key);

        if (options.required !== false) defaultTypeValidators.push(IsDefined());
        else defaultTypeValidators.push(IsOptional())

        if (propertyType === String) {
            defaultTypeValidators.push(IsString());
        }

        if (propertyType === Number) {
            defaultTypeValidators.push(Type(() => Number));
            defaultTypeValidators.push(IsNumber());
        }

        if (propertyType === Boolean) {
            defaultTypeValidators.push(Transform(({ value }) => {
                console.log(isBoolean(value));
                return isBoolean(value) ? value : (isBooleanString(value) ?value === "true" : null)
            })); // allow only strict boolean or boolean strings for query/path param
            defaultTypeValidators.push(IsBoolean());
        }

        if (options?.type) defaultTypeValidators.push(ValidateNested())

        defaultTypeValidators.forEach(validatorAnnotation => validatorAnnotation(target, key));
    }
}