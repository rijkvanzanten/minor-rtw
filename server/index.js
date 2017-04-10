const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const getMimeType = require('./lib/mimetype');

http
  .createServer(requestHandler)
  .listen(process.env.PORT || 3000, onHTTPListen);

function requestHandler(req, res) {
  console.log(`${req.method} ${req.url}`);

  // Parse url
  const parsedUrl = url.parse(req.url);

  let pathname = `./public/${parsedUrl.pathname}`;

  fs.exists(pathname, onExistCheck);

  function onExistCheck(exist) {
    // Return 404 if file doesn't exist
    if (!exist) {
      res.statusCode = 404;
      return res.end(`File ${pathname} not found`);
    }

    // If it's a directory, check for index.html
    if (fs.statSync(pathname).isDirectory()) {
      pathname += '/index.html';
    }

    // Read file from file system
    fs.readFile(pathname, onReadFile);

    function onReadFile(err, data) {
      if (err) {
        res.statusCode = 500;
        return res.end(`Error getting file: ${err}`);
      }

      const fileExtension = path.parse(pathname).ext;
      res.setHeader('Content-type', getMimeType(fileExtension));
      res.end(data);
    }
  }
}

function onHTTPListen(err) {
  if (err) {
    throw err;
  }

  return console.log(`Server is listening at port ${process.env.PORT || 3000}`);
}
