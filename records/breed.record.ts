import {Breed} from "../types";
import {pool} from "../units/db";
import {FieldPacket} from "mysql2";

type BredResults = [Breed[], FieldPacket[]];

export class BreedRecord implements Breed{
    breed: string;

    constructor(obj:Breed) {
        this.breed = obj.breed;
    }

    static async listAll():Promise<Breed[]> {
        const [results] = await pool.execute("SELECT * FROM `breeds`") as BredResults;
        return results.map(obj => new BreedRecord(obj));
    }

}