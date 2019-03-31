const express = require('express');
const http=require('http');
const morgan=require('morgan');

const hostname = 'localhost'
const port = 3000;

const app = express();
app.use(morgan('dev'))

//I'm serving the static page here, __dirname basically means it searches for the index.html file in the root, so some other folder?
//We have to concatanate - __dirname+./folder/
app.use(express.static(__dirname));

//Here I'm using the use function of express, which has a callback called next, we will see it's use when declaring end points
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