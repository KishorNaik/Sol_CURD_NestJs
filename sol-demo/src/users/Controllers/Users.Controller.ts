import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    HttpStatus,
    Query,
  } from '@nestjs/common';
import { get } from 'http';
import { UserDTO } from '../DTO/UserDTO';
import { UserService } from '../Services/Users.Service';

@Controller('api/users')
export class UserController{
    constructor(private userService: UserService) {}

    @Post("create")
    public async CreateUsers(@Body() user:UserDTO){
        try
        {
            await this.userService.AddUserAsync(user);
            return {
                statusCode: HttpStatus.OK,
                message: 'User created successfully',
            }
        }
        catch(ex)
        {
            throw ex;
        }
    }

    @Post("update")
    public async UpdateUsers(@Body() user:UserDTO){
        try
        {
            await this.userService.UpdateUserAsync(user);
            return {
                statusCode: HttpStatus.OK,
                message: 'User Updated successfully',
            }
        }
        catch(ex){
            throw ex;
        }
    }

    @Get("all")
    public async GetAllUsers(): Promise<{
        statusCode:HttpStatus,
        message:string,
        data:UserDTO[]
    }>
    {
        try
        {
            const userList:UserDTO[]=await this.userService.GetAllUsersAsync();
            return {
                statusCode:HttpStatus.OK,
                message:"Users fetched successfully",
                data:userList
            }
        }
        catch(ex){
            throw ex;
        }
    }

    @Get("userbyid/:id")
    public async GetUserById(@Param("id") id:number) : Promise<{
        statusCode:HttpStatus,
        message:string,
        data:UserDTO
    }>{
        try
        {
            const user:UserDTO=await this.userService.GetUserById({
                UserId:id
            });

            if(user===undefined || user===null)
                return {
                    statusCode:HttpStatus.NOT_FOUND,
                    message:"Something went wrong",
                    data:undefined
                }

            return {
                statusCode:HttpStatus.OK,
                message:"User fetched successfully",
                data:user
            };
        }
        catch(ex)
        {
            throw ex;
        }
    }

    @Get("userbyemail")
    public async GetUserByEmailId(@Query("email") email:string) : Promise<{
        statusCode:HttpStatus,
        message:string,
        data:UserDTO
    }>{
        try
        {
            const user:UserDTO=await this.userService.GetUserByEmailId({
               EmailId:email
            });

            if(user===undefined || user===null)
            return {
                statusCode:HttpStatus.NOT_FOUND,
                message:"Something went wrong",
                data:undefined
            }

            return {
                statusCode:HttpStatus.OK,
                message:"User fetched successfully",
                data:user
            };
        }
        catch(ex)
        {
            throw ex;
        }
    }
}