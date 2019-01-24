const fs = require('fs');
const http = require('http');
const querystring = require('querystring');
const element = require('./buildelement');
const index = require('./reIndex');

const PORT = process.env.PORT || 8080;

const server = http.createServer(function (req, res) {
  let path = urlCheck(req.url);
  let body = '';
  req.on('data', function (chunk) {
    body += chunk;
  });

  req.on('end', function (chunk) {
    console.log(req.method);
    if (chunk) { body += chunk; }
    if (req.method === 'GET') {
      fs.readFile('./public' + path, 'utf8', (err, data) => {
        if (err && err.code === 'ENOENT') {
          res.statusCode = 404;
          fs.readFile('./public/404.html', 'utf8', (err, data) => {
            if (err) { throw err; }
            return res.end(data);
          })
        } else if (err) {
          console.log(err);
          throw err;
        } else {
          return res.end(data);
        }
      });
    } else if (req.method === 'POST') {
      if (!(req.url === '/elements')) {
        return res.end('You cannot send a post to ' + req.url);
      }
      elementData = querystring.parse(body);

      // write file
      fs.writeFile('./public/' + elementData.elementName + '.html', element(elementData), (err, data) => {
        if (err) {
          res.writeHead(500);
          res.write('Sorry could not write file');
          return res.end();
        }
        index();
      });

      res.writeHead('200', {
        'Content-Type': 'application/json'
      })

      res.write('{ "success": true }');
      return res.end();
    } else if (req.method === 'PUT') {
      changeElement(path, elementData);
    } else if (req.method === 'DELETE') {
      deleteElement(path);
    }
  });
});

function urlCheck(reqUrl) {
  switch (reqUrl) {
    case '':
    case '/':
    case '/index':
      return '/index.html'
    case '/hydrogen':
      return '/hydrogen.html'
    case '/helium':
      return '/helium.html'
    case '/css/styles':
      return '/styles.css'
    default:
      return reqUrl;
  }
}


server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});