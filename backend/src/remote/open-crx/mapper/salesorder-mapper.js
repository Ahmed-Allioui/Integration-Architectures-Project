const { Salesorder } = require("../dto/salesorder")

exports.map = function(valueToMap, positions, accounts) {
    if(!valueToMap) return {};
    let salesorder = new Salesorder();
    salesorder.identity = valueToMap.identity;
    salesorder.createdAt = valueToMap.createdAt;
    salesorder.positions = positions ? positions : '';
    salesorder.customer = selectAccountByIdentity(accounts.customers, valueToMap.customerIdentity);
    salesorder.salesman = selectAccountByIdentity(accounts.salesmen, valueToMap.salesmanIdentity);
    return salesorder;
}


const selectAccountByIdentity = function(accounts, identity) {
    const results = accounts.filter(acc => acc.identity == identity);
    return results && results.length > 0 ? results[0] : '';
}