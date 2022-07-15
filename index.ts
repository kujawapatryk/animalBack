import express, {json} from "express";
import cors from 'cors';
import 'express-async-errors';
import {handleError} from "./units/errors";
import cookieParser from "cookie-parser"
import {AnimalRecord} from "./records/animal.record";
import {registrationRouter} from "./routers/registration";
import {animalRouter} from "./routers/animal";

// import {handleError} from "./utils/errors";
// import {homeRouter} from "./routers/home";
// import {childRouter} from "./routers/child";
// import {giftRouter} from "./routers/gift";


const app = express();
app.use(cors({origin: 'http://localhost:3000',}));
app.use(json());



app.get('/',async (req,res)=>{
    // const test = await  AnimalRecord.getOne('2dce706d-02da-11ed-8fa0-d05099813d65');
    // console.log(test);
    //
    // const test2 = new AnimalRecord({
    //
    //         age: 12,
    //         author: '118600d1-02d1-11ed-8fa0-d05099813d65',
    //         breed: 'jamnik',
    //         child_friendly: 1,
    //         date: new Date(),
    //     dog_size: 2,
    //     gender: 'samiec',
    //     name: 'maronio',
    //     pet_friendly: 0,
    //     reproduction: 0,
    //     title: 'pieserinio'

// });
    // console.log(test2.insert());


})

 app.use('/registration', registrationRouter);
 app.use('/animal', animalRouter);


app.use(handleError);
app.use(cookieParser());


app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on http://localhost:3001');
});