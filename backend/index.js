import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";
dotenv.config();
const app = express();

console.log('Server running at port 5000a')
var allowCrossDomain = function(req, res, next) {
    console.log('Server running at port 5000b')

    const corsWhitelist = [
        'http://localhost:3000',
        'http://3.145.26.185:3000',
    ];

    console.log(req.headers.origin);
//nota recuerda quitar eso y colocar la lista blanca
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);
//app.use(cors({ credentials:true, origin:'http://3.145.26.185:3000'}));
app.use(cookieParser());
app.use(express.json());
app.use(router);
 
app.listen(5000, ()=> console.log('Server running at port 5000'));