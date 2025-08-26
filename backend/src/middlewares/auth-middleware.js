const securityService = require("../services/security-service");

/**
 * this express middleware checks if a user is authenticated or even has admin permissions;
 * otherwise the request gets intercepted and status 401 is returned
 * @param {String} permission if true, user needs to be admin
 * @return {(function(*, *, *): void)|*}
 */
exports.checkAuthorization = (permission) => {
    return (req, res, next) => {
        const session = req.session;
        if(session.authenticated){ //check if session was marked as authenticated
            if(securityService.hasPermission(session, permission)){ //check if user has permission
                next(); //proceed with next middleware or handler
                return;
            }
        }
        res.status(401).send("Operation not allowed, please check your permissions"); //intercept request
    }
}