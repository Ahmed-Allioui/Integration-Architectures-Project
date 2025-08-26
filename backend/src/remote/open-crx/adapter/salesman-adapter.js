/**
 * this module is responsible to adapte a normal account from type "contract" to a salesman class
 */

const { Salesman } = require("../dto/salesman")

exports.adapt = function(contract) {
    let salesman = new Salesman();
    salesman.identity = contract.identity;
    salesman.employeeId = contract.governmentId;
    return salesman;
}