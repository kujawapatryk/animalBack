import express, {json} from "express";
import cors from 'cors';
import 'express-async-errors';

// import {handleError} from "./utils/errors";
// import {homeRouter} from "./routers/home";
// import {childRouter} from "./routers/child";
// import {giftRouter} from "./routers/gift";

// import "./utils/db";

const app = express();
app.use(cors({origin: 'http://localhost:3000'}));
app.use(json());




// app.use('/', homeRouter);
// app.use('/child', childRouter);
// app.use('/gift', giftRouter);
//

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on http://localhost:3001');
});