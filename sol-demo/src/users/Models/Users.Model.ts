
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:"Users"})
export class UserModel{
    @PrimaryGeneratedColumn()
    public UserId?:number;

    @Column()
    public FirstName?:string;

    @Column()
    public LastName?:string;

    @Column()
    public EmailId?:string
}