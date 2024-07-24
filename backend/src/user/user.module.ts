import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { userController } from "./user.controller";


@Module({
    imports:[],
    providers: [
                  UserService,
        {
        provide: "MONEY",
        useValue: {"amount": "Rs 5000"}
    }],
    controllers:[userController]
})
export class UserModule{}