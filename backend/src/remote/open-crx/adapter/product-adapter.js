/**
 * this module is responsible to adapte a "legalEntity" to a customer class
 */

 const { Product } = require("../dto/product")

 exports.adapt = function(value) {
     let product = new Product();
     product.identity = value.identity;
     product.name = value.name;
     return product;
 }