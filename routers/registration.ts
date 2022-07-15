import {Router} from "express";
import {RegistrationRecord} from "../records/registration.record";

export const registrationRouter = Router();

registrationRouter.post('/', async (req,res) =>{
 const registration = new RegistrationRecord(req.body);
   const result = await registration.insert();
   if(result === '397')
       res.status(397).send(result);
   else
    res.status(200).send(result);






})