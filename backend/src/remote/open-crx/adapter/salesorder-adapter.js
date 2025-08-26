/**
 * this module is responsible to adapte a received salesorder to an intern salesorder object
 */

 const { AdaptedSalesorder } = require("../dto/adapted-salesorder")

 exports.adapt = function(value) {
     let salesorder = new AdaptedSalesorder();
     salesorder.identity = value.identity;
     salesorder.href = value['@href']
     salesorder.createdAt = value.createdAt;
     salesorder.customerIdentity = value.customer['$'];
     salesorder.salesmanIdentity = value.salesRep['$'];
     return salesorder;
 }