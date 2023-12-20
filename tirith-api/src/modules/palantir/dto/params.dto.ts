import { XApiProperty } from "src/decorators/apiProperty.decorator";

/**
 * Use for path params called `:id` that are typed as number
 */
export class NumberIdParamDto {

    @XApiProperty({ description: "Id parameter" })
    id: number;
}

/**
 * Use for path params called `:id` that are typed as string
 */
export class StringIdParamDto {

    @XApiProperty({ description: "Id parameter" })
    id: string;
}

/**
 * Use for path params called `:token` that are typed as string
 */
export class StringTokenParamDto {

    @XApiProperty({ description: "Token parameter" })
    token: string;
}

/**
 * Use for path params called `:token` that are typed as number
 */
export class NumberTokenParamDto {

    @XApiProperty({ description: "Token parameter" })
    token: number;
}

/**
 * Use for path params called `:login` that are member logins
 */
export class LoginTokenParamDto {

    @XApiProperty({ description: "Member Login parameter" })
    login: number;
}