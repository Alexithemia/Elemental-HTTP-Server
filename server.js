const fs = require('fs');
const http = require('http');
const querystring = require('querystring');
const check = require('./check');
const element = require('./buildelement');
const index = require('./reIndex');
const authorize = require('./authorize')

const PORT = process.env.PORT || 8080;

//creates and starts server
const server = http.createServer(function (req, res) {
  let path;
  let body = '';
  //reads directory and checks if uri is the same as a file without the filetype
  fs.readdir('./public/', function (err, files) {
    if (err) { throw err };
    files.forEach(file => {
      if (req.url === '/' + file.split('.')[0]) {
        path = '/' + file;
      }
    });
    if (!path) {
      if (req.url === '/' || req.url === undefined) {
        path = '/index.html'
      } else {
        path = req.url;
      }
    }
    //concats on data chunks sent in multiple requests
    req.on('data', function (chunk) {
      body += chunk;
    });

    //on last message of request concats last chunk, checks body and runs methods
    req.on('end', function (chunk) {
      console.log(req.method);
      if (chunk) { body += chunk; };
      let elementData = querystring.parse(body);

      //checks body for correct data
      if (!check.body(elementData)) {
        res.writeHead('400', {
          'Content-Type': 'application/json'
        });
        res.write('{ "error": "incorrectly formed body received" }');
        return res.end();
      };
      if (req.method === 'GET') {
        //on GET reads file and sends content back as body, 404 return if it does not exist
        fs.readFile('./public' + path, 'utf8', (err, data) => {
          if (err && err.code === 'ENOENT') {
            res.statusCode = 404;
            fs.readFile('./public/404.html', 'utf8', (err, data) => {
              if (err) { throw err; };
              return res.end(data);
            });
          } else if (err) {
            console.log(err);
            throw err;
          } else {
            return res.end(data);
          };
        });
      } else if (req.method === 'POST') {
        //on POST checks authorization and correct path for creation, then writes new page
        if (!req.headers.authorization) {
          res.writeHead(401, {
            'WWW-Authenticate': 'Basic realm="Secure Area"'
          });
          return res.end('<html><body>Not Authorized</body></html>');
        } else {
          let encodedString = req.headers.authorization.split(' ')[1];
          //check if authorization value was created correctly by client
          if (typeof encodedString !== 'string') {
            res.writeHead(401, {
              'WWW-Authenticate': 'Basic realm="Secure Area"'
            });
            return res.end('<html><body>Not Authorized</body></html>');
          };
          let base64Buffer = Buffer.from(encodedString, 'base64');
          let decodedString = base64Buffer.toString();

          if (!authorize(decodedString)) {
            res.writeHead(401, {
              'WWW-Authenticate': 'Basic realm="Secure Area"'
            });
            return res.end('<html><body>Not Authorized</body></html>');
          };
        };
        //check path
        if (!(req.url === '/elements')) {
          res.writeHead(400, {
            'Content-Type': 'application/json'
          });
          return res.end('You cannot send a post to ' + req.url);
        };
        // write file
        fs.writeFile('./public/' + elementData.elementName + '.html', element(elementData), (err) => {
          if (err) {
            res.writeHead(500, {
              'Content-Type': 'application/json'
            });
            return res.end('{ "error" : "could not write file" }');
          };
          index();

          res.writeHead(200, {
            'Content-Type': 'application/json'
          });
          return res.end('{ "success": true }');
        });
      } else if (req.method === 'PUT') {
        //on PUT checks authorization and file exists at path, then rewrites file with changes
        if (!req.headers.authorization) {
          res.writeHead(401, {
            'WWW-Authenticate': 'Basic realm="Secure Area"'
          });
          return res.end('<html><body>Not Authorized</body></html>');
        } else {
          let encodedString = req.headers.authorization.split(' ')[1];
          //check if authorization value was created correctly by client
          if (typeof encodedString !== 'string') {
            res.writeHead(401, {
              'WWW-Authenticate': 'Basic realm="Secure Area"'
            });
            return res.end('<html><body>Not Authorized</body></html>');
          };
          let base64Buffer = Buffer.from(encodedString, 'base64');
          let decodedString = base64Buffer.toString();

          if (!authorize(decodedString)) {
            res.writeHead(401, {
              'WWW-Authenticate': 'Basic realm="Secure Area"'
            });
            return res.end('<html><body>Not Authorized</body></html>');
          };
        }
        //check if file exists
        fs.stat('./public' + path, (err) => {
          if (err && err.code === 'ENOENT') {
            res.writeHead(500, {
              'Content-Type': 'application/json'
            });
            return res.end('{ "error" : "resource ' + path + ' does not exist" }');
          } else if (err) {
            console.log(err);
            throw err;
          } else {
            //write file
            fs.writeFile('./public/' + elementData.elementName + '.html', element(elementData), function (err) {
              if (err) {
                res.writeHead(500, {
                  'Content-Type': 'application/json'
                });
                return res.end('{ "error" : "could not write file" }');
              };
              index();
              res.writeHead(200, {
                'Content-Type': 'application/json'
              });
              return res.end('{ "success": true }');
            });
          };
        });
      } else if (req.method === 'DELETE') {
        //on DELETE checks authorization and if file exists, then deletes file
        if (!req.headers.authorization) {
          res.writeHead(401, {
            'WWW-Authenticate': 'Basic realm="Secure Area"'
          })
          return res.end('<html><body>Not Authorized</body></html>');
        } else {
          let encodedString = req.headers.authorization.split(' ')[1];
          //check if authorization value was created correctly by client
          if (typeof encodedString !== 'string') {
            res.writeHead(401, {
              'WWW-Authenticate': 'Basic realm="Secure Area"'
            });
            return res.end('<html><body>Not Authorized</body></html>');
          };
          let base64Buffer = Buffer.from(encodedString, 'base64');
          let decodedString = base64Buffer.toString();
          if (!authorize(decodedString)) {
            res.writeHead(401, {
              'WWW-Authenticate': 'Basic realm="Secure Area"'
            })
            return res.end('<html><body>Not Authorized</body></html>');
          };
        }
        //check if file exists
        fs.stat('./public' + path, (err) => {
          if (err && err.code === 'ENOENT') {
            res.writeHead(500, {
              'Content-Type': 'application/json'
            });
            return res.end('{ "error" : "resource ' + path + ' does not exist" }');
          } else if (err) {
            console.log(err);
            throw err;
          } else {
            //delete file
            fs.unlink('./public' + path, function (err) {
              if (err) {
                console.log(err);
                throw err;
              };
              index();
              res.writeHead(200, {
                'Content-Type': 'application/json'
              });
              return res.end('{ "success" : true }');
            });
          };
        });
      } else {
        res.writeHead(400, {
          'Content-Type': 'application/json'
        });
        return res.end('{ "error" : "method not supported by server" }');
      };
    });
  });
});

//server listening on chosen port
server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});