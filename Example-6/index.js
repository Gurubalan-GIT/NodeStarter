const express = require('express');
const http=require('http');
const morgan=require('morgan');
const bodyparser=require('body-parser');

const hostname = 'localhost'
const port = 3000;

const app = express();
app.use(morgan('dev'))
app.use(express.static(__dirname));
//Now this means your request body if sent in jSON format will get parsed. An example is given with POST request below
app.use(bodyparser.json());

app.all('/dishes',(req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

app.get('/dishes', (req,res,next) => {
    res.end('Will send all the dishes to you!');
});
//Here as you can see - We have body as the object and JS automatically takes it as body of the request passed and hence parses it.
//So to test this, launch Postman and send the request with jSON parameters like : {"name":"Plates","description":"Big Plates"}
app.post('/dishes', (req, res, next) => {
 res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.put('/dishes', (req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /dishes');
});
 
app.delete('/dishes', (req, res, next) => {
    res.end('Deleting all dishes');
});

//Now dishes/:dishId will automatically become a part of param as a property
app.get('/dishes/:dishId', (req,res,next) => {
    res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
});

app.post('/dishes/:dishId', (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /dishes/'+ req.params.dishId);
});

app.put('/dishes/:dishId', (req, res, next) => {
  res.write('Updating the dish: ' + req.params.dishId + '\n');
  res.end('Will update the dish: ' + req.body.name + 
        ' with details: ' + req.body.description);
});

app.delete('/dishes/:dishId', (req, res, next) => {
    res.end('Deleting dish: ' + req.params.dishId);
});

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