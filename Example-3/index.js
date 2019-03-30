const http=require('http');
const hostname = 'localhost';
const port = 3000;
const server = http.createServer((req,res)=>{
    //These are where we request headers from the request object, this is returned from the server after you launch you browser
    console.log(req.headers);

    //Usually 200 means there are no errors, we will handle different errors in Example-4 with 404 not found error messages also
    res.statusCode=200;
    res.setHeader('Content-Type','text/html');
    //I'm sending this res object to the browser/client as a html format we can also send files using the fs node module, refer example 4
    res.end('<html><body>Man this is a game changer!</body></html>')
    
})
//Starting the server
server.listen(port,hostname,()=>{
    console.log(`The server is running on - http://${hostname}:${port}`);
})