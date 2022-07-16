import {Router} from "express";
import {AnimalRecord} from "../records/animal.record";


export const animalRouter = Router();

animalRouter.post('/', async (req,res) => {

    console.log(req.body);
    const newAnimal = new AnimalRecord(req.body);

    const result = newAnimal.insert();
    res.json(newAnimal);

})
    .get('/all', async (req,res)=>{
        const result = await AnimalRecord.listAll();
        console.log(result);
        res.json(result);
        console.log('pobrane');
    })
    .get('/',(res,req)=>{
        console.log("a tuu dziala");
    })