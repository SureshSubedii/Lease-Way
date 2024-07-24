import { Inject, Injectable } from "@nestjs/common";


@Injectable()
export class UserService{
    constructor( @Inject("MONEY") private readonly money: Record<string,string> ){}

    signup(body){
        return body
    }


}