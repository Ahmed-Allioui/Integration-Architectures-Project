const userService = require("../services/user-service")

/**
 * endpoint, which returns information about the user, which is currently authenticated
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.getSelf = async function(req, res){
    res.send(req.session.user); //retrieve userdata of authenticated user from session and return it
}

/**
 * endpoint, which adds a new user to the database
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.addUser = async function(req, res){
    const db = req.app.get('db');   //get database from express
    userService.add(db, req.body)
        .then(_ => res.status(201).send({message: 'User created successfully'}))
        .catch(error => res.status(400).send(error))
}