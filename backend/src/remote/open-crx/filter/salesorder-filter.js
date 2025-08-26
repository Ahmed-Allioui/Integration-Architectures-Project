/**
 * Filter is a function that takes an array of salesorders from the remote open CRX 
 * and filter it to return only salesorders of the corresponding year
 */

exports.filter = function(salesorders, year) {
    return salesorders.filter(salesorder => {
        const date = new Date(salesorder.createdAt);
        return date.getFullYear() == year;
    });
}

