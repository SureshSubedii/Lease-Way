import { IsString } from "class-validator"

export class UserDto{

    @IsString()
    readonly email: string

    @IsString()
    readonly password:string

    @IsString()
    readonly fullName:string
}