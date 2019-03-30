const http=require('http');
//Now here we do some changes from Example=3
const fs=require('fs');
//Path modules
const path=require('path');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req,res)=>{
    //These are where we request headers from the request object, this is returned from the server after you launch you browser
    console.log(`Request for ${req.url} by method ${req.method}`);
//Server configs for serving the file 
    if (req.method == 'GET') {
        var fileUrl;
        if (req.url == '/') {
            fileUrl = '/index.html';}
        else {
            fileUrl = req.url;}
        var filePath = path.resolve('./'+fileUrl);
        const fileExt = path.extname(filePath);
        if (fileExt == '.html') {
          fs.exists(filePath, (exists) => {
            if (!exists) {
              res.statusCode = 404;
              res.setHeader('Content-Type', 'text/html');
              res.end('<html><body><h1>Error 404: ' + fileUrl + 
                          ' not found</h1></body></html>');
              return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            fs.createReadStream(filePath).pipe(res);
          });
        }
        else {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html');
          res.end('<html><body><h1>Error 404: ' + fileUrl + 
                  ' not a HTML file</h1></body></html>');
        }
      }
      else {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html');
          res.end('<html><body><h1>Error 404: ' + req.method + 
                  ' not supported</h1></body></html>');
      }
    })

//Starting the server
server.listen(port,hostname,()=>{
    console.log(`The server is running on - http://${hostname}:${port}`);
})