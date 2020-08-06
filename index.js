import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import Router from './router.js';
import mongoose from 'mongoose';

//DB Setup 
mongoose.connect('mongodb://127.0.0.1:27017/',{ useNewUrlParser: true ,useUnifiedTopology: true});

// app setup 
const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json({type:'*/*'}));
Router(app);

//server steup 
const port = process.env.port || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Express Server is up , Listening to port : ',port);
