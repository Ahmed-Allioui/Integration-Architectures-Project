const opencrxApi = require("../config/opencrx-api");
const salesmanFilter = require('../filter/salesman-filter')
const customerFilter = require('../filter/customer-filter')
const salesmanAdapter = require('../adapter/salesman-adapter')
const customerAdapter = require('../adapter/customer-adapter')

const acountStdPath = 'org.opencrx.kernel.account1/provider/CRX/segment/Standard'

/**
 * fetching account from opencrx api
 * @returns all accounts
 */
exports.fetchAllAccounts = async function () {
    const result = await opencrxApi.get(`${acountStdPath}/account`);
    const accounts = result.data.objects;
    return {
        salesmen: filterAndConvertToSalesmen(accounts),
        customers: filterAndConvertToCustomers(accounts)
    }
}

/**
 * this function filter all accounts to get only salesmen 
 * then convert accounts to salesmen and at the end filters
 * only salesmen having ids
 */
const filterAndConvertToSalesmen = function(accounts) {
    return salesmanFilter.filter(accounts)          // filter to get only contracts
        .map(salesmanAdapter.adapt)     // map contact to salesman     
        .filter(salesman => salesman.employeeId);   // than filter only salesmen with employee ids
}

/**
 * this function filter all accounts to get only customers 
 * then convert accounts to customers
 */
const filterAndConvertToCustomers = function(accounts) {
    return customerFilter.filter(accounts)          // filter to get only customers
        .map(customerAdapter.adapt);    // map accounts to customers
}