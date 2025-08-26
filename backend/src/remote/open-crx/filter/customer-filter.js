/**
 * Filter is a function that takes an array of accounts from the remote open CRX 
 * and filter it to return only salesmen (contacts)
 */

exports.filter = function(accounts) {
    return accounts.filter(account => account['@type'] == 'org.opencrx.kernel.account1.LegalEntity');
}