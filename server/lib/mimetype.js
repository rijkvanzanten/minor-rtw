module.exports = getMimeType;

const mimeTypes = {
  '.ico': 'image/x-icon',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff': 'application/font-woff',
  '.woff2': 'application/font-woff'
};

function getMimeType(extension) {
  return mimeTypes[extension] || 'text/plain';
}
