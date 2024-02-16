// json responses

// users objecet
const users = {};


// function to respond with json object
const respondJSON = (request, response, status, object) => {

    // apply content type for the headers
    const headers = {
        'Content-Type': 'application/json',
    };

    // respond back to the page
    response.writeHead(status, headers);
    response.write(JSON.stringify(object));
    response.end();
};

// function to respond without json obj, just header
// "meta data"
const respondJSONMeta = (request, response, status) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    response.writeHead(staus, headers);
    response.end();
};


// get users function
const getUsers = (request, response) => {
    // json object to send with users
    const responseJSON = {
        users,
    };
    return respondJSON(request, response, 200, responseJSON);
};

// getting the meta data of users
const getUsersMeta = (request, response) => respondJSONMeta(request, response, 200);

// NotFound function
const notFound = (request, response) => {

    // error message to send back
    const responseJSON = {
        message: "uh oh, the page you're looking for can't be found",
        id: 'notFound',
    };

    return respondJSON(request, response, 404, responseJSON);
};

// notFound meta data
const notFoundMeta = (request, response) => respondJSONMeta(request, response, 404);

// exports
module.exports = {
    respondJSON,
    respondJSONMeta,
    getUsers,
    getUsersMeta,
    notFound,
    notFoundMeta,
}