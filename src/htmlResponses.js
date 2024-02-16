// html responses

// file sysytem module
const fs = require('fs');

// grabbing the client page and style sheet
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

// grabbing the index page
const getIndex = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(index);
    response.end();
};

// getting the css page
const getCSS = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/css' });
    response.write(css);
    response.end();
};


// exports
module.exports = {
    getCSS,
    getIndex
};