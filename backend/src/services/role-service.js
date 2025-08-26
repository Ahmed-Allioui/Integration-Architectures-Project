const Role = require("../security/role");
const Roles = require("../security/roles").ROLES;

/**
 * this function checks if a role as string has the given permission
 * @param {String} roleString
 * @param {String} permission
 * @returns
 */
exports.roleHasPermission = function (roleString, permission) {
  if (!roleString || !permission) return false;
  const role = getRole(roleString);
  return role.permissions.indexOf(permission) > -1;
};

/**
 * this function takes a role as string and returns the role as object
 * @param {String} roleString
 * @returns
 */
const getRole = function (roleString) {
  for (const role of Roles) {
    if (role.name === roleString) {
      return role;
    }
  }
};
