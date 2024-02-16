// server setup
const http = require('http');
const url = require('url');
const query = require('querystring');

// handlers
const jsonHandler = require('./jsonResponses');
const htmlHandler = require('./htmlResponses');

// port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// requesting the body before we handle it
const parseBody = (request, response, handler) => {
    const body = [];

    // if there's a bad request error
    request.on('error', (err) => {
        console.dir(err);
        response.statusCode = 400;
        response.end();
    });

    // used whenever we get a 'chunk' of data
    request.on('data', (chunk) => {
        body.push(chunk); // will push the chunks together in received order
    });

    // turns the body array into a string when the request is finished
    request.on('end', () => {
        const bodyString = Buffer.concat(body).toString();
        const bodyParams = query.parse(bodyString);

        handler(request, response, bodyParams);
    });
};


// POST handler
const handlePost = (request, response, parsedURL) => {
    if (parsedURL.pathname === '/addUser') {
        parseBody(request, response, jsonHandler.addUser);
    }
};

// GET handler
const handleGet = (request, response, parsedURL) => {
    // route to all the predetermined pathnames
    if (parsedURL.pathname === '/style.css') {
        htmlHandler.getCSS(request, response);
    } else if (parsedURL.pathname === '/getUsers') {
        jsonHandler.getUsers(request, response);
    } else if (parsedURL.pathname === '/updateUser') {
        jsonHandler.updateUser(request, response);
    } else if (parsedURL.pathname === '/notReal') {
        jsonHandler.notFound(request, response);
    } else {
        htmlHandler.getIndex(request, response);
    }
};

// onRequest
const onRequest = (request, response) => {
    console.log(request);
    const parsedURL = url.parse(request.url);

    // check that the method of the request
    if (request.method === 'POST') {
        handlePost(request, response, parsedURL);
    } else {
        handleGet(request, response, parsedURL);
    }
};

// create the server
http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.01:${port}`);
});
