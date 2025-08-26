/**
 * this module is responsible to adapte a "legalEntity" to a customer class
 */

 const { Customer } = require("../dto/customer")

 exports.adapt = function(legalEntity) {
     let customer = new Customer();
     customer.identity = legalEntity.identity;
     customer.name = legalEntity.name;
     customer.accountRating = legalEntity.accountRating;
     return customer;
 }