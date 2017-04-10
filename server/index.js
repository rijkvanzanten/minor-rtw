const http = require('http');
const staticFileHandler = require('./lib/static-file-handler');

http
  .createServer(staticFileHandler)
  .listen(process.env.PORT || 3000, onHTTPListen);

function onHTTPListen(err) {
  if (err) {
    throw err;
  }

  return console.log(`Server is listening at port ${process.env.PORT || 3000}`);
}
