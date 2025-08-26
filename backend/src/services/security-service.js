const roleService = require("./role-service");

/**
 * this function prouves if the currently logged in user has the given permission
 * @param session 
 * @param {String} permission 
 * @returns 
 */
exports.hasPermission = function (session, permission){
    if(!session.authenticated) return false;
    const role = session.user.role;
    if(!role) return false;
    return roleService.roleHasPermission(role, permission);
}