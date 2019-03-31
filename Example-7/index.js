const express = require('express');
const http=require('http');
const morgan=require('morgan');
const bodyparser=require('body-parser');
const dishRouter = require('./routes/dishRouter');

const hostname = 'localhost'
const port = 3000;

const app = express();
app.use(morgan('dev'))
app.use(express.static(__dirname));
//Now this means your request body if sent in jSON format will get parsed. An example is given with POST request below
app.use(bodyparser.json());

app.use('/dishes', dishRouter);

//If none of these end points are set AND index.html isn't fount the below HTML file is served!
app.use((req,res,next)=>{
    console.log(req.headers);
    res.statusCode=200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body>Express success!</body></html>')
})

const server = http.createServer(app);

server.listen(port,hostname,()=>{
    console.log(`The server is running on - http://${hostname}:${port}`);
})