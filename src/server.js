// server setup
const http = require('http');
const url = require('url');

// handlers
const jsonHandler = require('./jsonResponses');
const htmlHandler = require('./htmlResponses');

// port
const port = process.env.PORT || process.env.NODE_PORT || 3000;


// buidling the url struct using GET and HEAD
const urlStruct = {

    // GET some data
    GET: {
        '/': htmlHandler.getIndex,
        '/style.css': htmlHandler.getCSS,
        '/getUsers': jsonHandler.getUsers,
        notFound: jsonHandler.notFound,
        default: htmlHandler.getIndex,
    },

    HEAD: {
        '/getUsers': jsonHandler.getUsersMeta,
        notFound: jsonHandler.notFoundMeta
    }
}

// onRequest
const onRequest = (request, response) => {
    console.log(request);
    const parsedURL = url.parse(request.url);

    // check that the server can handle the request
    // if not, return a 404
    if (!urlStruct[request.method]) {
        return urlStruct.HEAD.notFound(request, response);
    };

    // check for predetermined pathnames
    if (urlStruct[request.method][parsedURL.pathname]) {
        return urlStruct[request.method][parsedURL.pathname](request, response);
    }

    // if nothing is found, send back a 404
    return urlStruct[request.method].notFound(request, response);
}



// create the server
http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.01:${port}`);
});