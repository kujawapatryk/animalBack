import {Router} from "express";
import {AnimalRecord} from "../records/animal.record";


export const animalRouter = Router();

animalRouter.post('/', async (req,res) => {

    console.log(req.body);
    const newAnimal = new AnimalRecord(req.body);

    const result = newAnimal.insert();
    res.json(newAnimal);

});
