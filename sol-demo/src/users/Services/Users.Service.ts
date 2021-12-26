import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from '../DTO/UserDTO';
import { UserModel } from '../Models/Users.Model';

@Injectable()
export class UserService{

    constructor(
        @InjectRepository(UserModel)
        private userRepository:Repository<UserModel> // Dependency Injection
        ){}

    public async AddUserAsync(userDTO:UserDTO):Promise<void>{
        try
        {
            await this 
                    .userRepository
                    .createQueryBuilder()
                    .insert()
                    .into(UserModel)
                    .values({
                        FirstName:userDTO.FirstName,
                        LastName:userDTO.LastName,
                        EmailId:userDTO.EmailId
                    })
                    .execute();
        }
        catch(ex)
        {
            throw ex;
        }
    }

    public async UpdateUserAsync(userDTO:UserDTO) : Promise<void>{
        try
        {
            await this
                    .userRepository
                    .createQueryBuilder()
                    .update()
                    .set({
                        EmailId:userDTO.EmailId,
                        FirstName:userDTO.FirstName,
                        LastName:userDTO.LastName
                    })
                    .where("UserId = :UserId", { UserId: userDTO.UserId })
                    .execute();
        }
        catch(ex)
        {
            throw ex;
        }
    }

    public async GetAllUsersAsync(): Promise<UserDTO[]>{
        try
        {
            var userList:UserDTO[]= await this
                   .userRepository
                   .createQueryBuilder()
                   .select("Users")
                   .from(UserModel, "Users")
                   .getRawMany<UserDTO>();

            return userList;

        }
        catch(ex)
        {
            throw ex;
        }
    }

    public async GetUserById(userDTO:UserDTO) : Promise<UserDTO>{
        try
        {
            var user:UserDTO= await this
                   .userRepository
                   .createQueryBuilder()
                   .select("Users")
                   .from(UserModel, "Users")
                   .where("Users.UserId=:UserId",{"UserId":userDTO.UserId})
                   .getRawOne<UserDTO>();

            return user;
        }
        catch(ex)
        {
            throw ex;
        }
    }

    public async GetUserByEmailId(userDTO:UserDTO) : Promise<UserDTO>{
        try
        {
            var user:UserDTO= await this
                   .userRepository
                   .createQueryBuilder()
                   .select("Users")
                   .from(UserModel, "Users")
                   .where("Users.EmailId=:EmailId",{"EmailId":userDTO.EmailId})
                   .getRawOne<UserDTO>();

            return user;
        }
        catch(ex)
        {
            throw ex;
        }
    }
}