import { User } from "../entities/User";

export interface IUsersRpository{
    findByEmail(email : string):Promise<User>;
    save(user: User): Promise<void>;
}