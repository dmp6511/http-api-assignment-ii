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

    response.writeHead(status, headers);
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

// adding a user
const addUser = (request, response, body) => {
    // defaults if left empty
    const responseJSON = {
        message: 'Name and Age are BOTH required',
    };

    // check that both fields have values
    // if not send back a 400
    if (!body.name || !body.age) {
        responseJSON.id = 'missingParams';
        return respondJSON(request, response, 400, responseJSON);
    }
    // staus code that represents an update
    let responseCode = 204; // success

    // if the user doesnt exist, create it
    if (!users[body.name]) {
        responseCode = 201;
        users[body.name] = {};
    }

    // add and/or update the values
    users[body.name].name = body.name;
    users[body.name].age = body.age;
    users[body.name].createdAt = Date.now();

    // send back a response
    if (responseCode === 201) {
        responseJSON.message = `User '${body.name}' has been created.`;
        return respondJSON(request, response, 201, responseJSON);
    }

    // send back the meta data too
    return respondJSONMeta(request, response, responseCode);
};

// updating users object
const updateUser = (request, response) => {
    // create a new user and use the values from the queries
    const newUser = {
        createdAt: Date.now(),
    };

    newUser.message = `User ${newUser.name} has been updated.`;
    users[newUser.createdAt] = newUser;

    // return with a 201 (an item has be created)
    return respondJSON(request, response, 201, newUser);
};
// NotFound function
const notFound = (request, response) => {
    // error message to send back
    const responseJSON = {
        message: "uh oh, the page you're looking for cannot be found",
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
    addUser,
    updateUser,
    getUsersMeta,
    notFound,
    notFoundMeta,
};
