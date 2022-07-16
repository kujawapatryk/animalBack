import {Router} from "express";
import {AnimalRecord} from "../records/animal.record";
import {BreedRecord} from "../records/breed.record";


export const animalRouter = Router();

animalRouter.post('/', async (req,res) => {

    console.log(req.body);
    const newAnimal = new AnimalRecord(req.body);

    const result = newAnimal.insert();
    res.json(newAnimal);

})
    .get('/all', async (req,res)=>{
        const result = await AnimalRecord.listAll();
        res.json(result);

    })
    .get('/',(res,req)=>{
        console.log("a tuu dziala");
    })
    .get('/breed', async (req,res)=>{
        const result = await BreedRecord.listAll();
        res.json(result);
        console.log(result);
    })