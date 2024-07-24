import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";

@Controller('user')
export class userController{
    constructor( private readonly userService: UserService){}
    @Post('signup')
    signup(@Body()body: UserDto){
        return this.userService.signup(body)

    }
}