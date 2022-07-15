import {RegistrationEntity} from "../types";
import {ValidationError} from "../units/errors";
import bcrypt from 'bcryptjs';
import {v4 as uuid} from "uuid";
import {pool} from "../units/db";
import {salt} from "../date/SALT"
import {throws} from "assert";
import {FieldPacket} from "mysql2";

export class  RegistrationRecord implements RegistrationEntity{
    confirmPassword: string;
    mail: string;
    name: string;
    password: string;
    date_reg?: Date;
    id?: string;

    constructor(obj:RegistrationEntity) {
        if(!obj.name || obj.name.length >=64)
            throw new ValidationError('Nazwa nie może mieć więcej niż 64 znaków');

        if(!obj.mail)
            throw new ValidationError('Musisz podać maila')
        if(obj.password !== obj.confirmPassword)
            throw new ValidationError('Podane hasła muszą być identyczne');



        this.confirmPassword = obj.confirmPassword;
        this.password = obj.password;
        this.mail = obj.mail;
        this.name = obj.name;
    }



    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Cannot insert something that is already inserted!');
        }
        const [results] = await pool.execute("SELECT id FROM `users` WHERE `name` = :name", this) as [RegistrationEntity[],FieldPacket[]];
        console.log(results);
            if (results.length !== 0) {
                return ('397');
               // throw new ValidationError('Nazwa użytkownika jest zajęta.');
            }
        this.date_reg = new Date();
        this.password= bcrypt.hashSync(this.password, salt);
        console.log(this.password.length);
        console.log(this.date_reg);
        await pool.execute("INSERT INTO `users`(`id`,`name`, `password`, `mail`, `date_reg` ) VALUES(:id, :name, :password, :mail, :date_reg)", this);

        return this.id;
    }

    // static async checkName(): Promise<void>{
    //     const [results] = await pool.execute("SELECT id FROM `users` WHERE `name` = :name", this) as RegistrationEntity;
    //     console.log(results);
    //     if (results.length !== 0)
    //         throw new ValidationError();
    // }

};