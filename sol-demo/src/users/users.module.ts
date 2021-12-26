import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './Controllers/Users.Controller';
import { UserModel } from './Models/Users.Model';
import { UserService } from './Services/Users.Service';

@Module({
    imports:[TypeOrmModule.forFeature([UserModel])],
    controllers:[UserController],
    providers:[UserService]
})
export class UsersModule {}
