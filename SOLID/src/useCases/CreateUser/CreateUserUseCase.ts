import { User } from "../../entities/User";
import { IUsersRpository } from "../../repositories/IUsersRepository"
import { ICreateUserRequestDTO } from "./CreateUserDTO"

export class CreateUserUseCase{

    constructor(
        private UsersRep : IUsersRpository 
    ){}

    async execute(data: ICreateUserRequestDTO){
        const userAlredyExists = await this.UsersRep.findByEmail(data.email);


        if(userAlredyExists){
            throw new Error("User already exists.");
        }

        const user = new User(data);

        await this.UsersRep.save(user);

        
    }
}