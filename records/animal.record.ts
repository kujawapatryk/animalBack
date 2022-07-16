import {AnimalEntity} from "../types";
import {ValidationError} from "../units/errors";
import {pool} from "../units/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from 'uuid';

interface AddAnimalEntity extends Omit<AnimalEntity, 'id'>{
    id?:string;
}
type AnimalResults = [AnimalEntity[], FieldPacket[]];

export class AnimalRecord implements AnimalEntity{
    age: number;
    author: string;
    breed: string;
    child_friendly: number;
    date: Date;
    dog_size: number;
    gender: string;
    id: string;
    name: string;
    pet_friendly: number;
    reproduction: number;
    title: string;
    'animal.author'?: string;

    constructor(obj:AddAnimalEntity) {
        if(!obj.name || obj.name.length >48)
            throw new ValidationError('Musisz podać imię zwierzaka, i nie może one przekraczać 48 znaków');

        if(!obj.title || obj.title.length >255)
            throw new ValidationError('Musisz podać tytuł i nie może przekraczać 255 znaków');
        if(!obj.breed )
            throw new ValidationError('Nie wybrałeś rasy.');
        if(!obj.pet_friendly || !obj.child_friendly)
            throw new ValidationError('Nie określiłeś nastawienia psa do innych zwierząt lub dzieci.');
        if(!obj.age)
            throw new ValidationError('Nie podałeś wieku psa');
         if(!obj.reproduction)
            throw new ValidationError('Określ czy pies został poddany kastracji/sterylizacji');

        if(!obj.dog_size)
            throw new ValidationError('Określ wielkość psa');

        this.age = obj.age;
        this.author = obj.author;
        this.breed = obj.breed;
        this.child_friendly = obj.child_friendly;
        this.date = obj.date;
        this.dog_size = obj.dog_size;
        this.gender = obj.gender;
        this.id = obj.id;
        this.name = obj.name;
        this.pet_friendly = obj.pet_friendly;
        this.reproduction = obj.reproduction;
        this.title = obj.title;

    }

    static async getOne(id: string): Promise<AnimalEntity | null> {
        const [results] = await pool.execute("SELECT * FROM `animal` WHERE `id` = :id", {
            id,
        }) as AnimalResults;

        return results.length === 0 ? null : new AnimalRecord(results[0]);
    }
    static async listAll():Promise<AnimalEntity[]> {
        const [results] = await pool.execute("SELECT * FROM `animal`") as AnimalResults;
        // const [results] = await pool.execute("SELECT `animal`.*, `users`.`name` AS `animal.author`" +
        //     "FROM `animal` LEFT JOIN `users` ON `animal`.`author` = `users`.`id`;")
        return results.map(obj => new AnimalRecord(obj));
    }

    // static async findAll(name: string): Promise<AnimalEntity[]> {
    //     const [results] = await pool.execute("SELECT * FROM `ads` WHERE `name` LIKE :search", {
    //         search: `%${name}%`,
    //     }) as AdRecordResults;
    //
    //     return results.map(result => {
    //         const {
    //             id, lat, lon,
    //         } = result;
    //
    //         return {
    //             id, lat, lon,
    //         };
    //     });
    // }

    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Cannot insert something that is already inserted!');
        }
        this.date = new Date();
        this.author ='e3261101-4836-4439-81f6-4495fd4b0d4f'; //@TODO pobieranie id uzytkownika z cookie
        console.log(AnimalRecord);
        await pool.execute("INSERT INTO `animal`(`id`,`title`, `name`, `gender`, `age`, `breed`, `dog_size`, `reproduction`, `child_friendly`, `pet_friendly`, `author`, `date`) VALUES(:id,:title, :name, :gender, :age, :breed, :dog_size, :reproduction, :child_friendly, :pet_friendly, :author, :date)", this);

        return this.id;
    }
}




