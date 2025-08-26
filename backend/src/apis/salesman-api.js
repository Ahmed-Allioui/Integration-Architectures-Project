const salesmanService = require("../services/salesman-service");

/**
 * 
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
 exports.deleteSalesman = function (req, res){
    salesmanService.deleteSalesman(req.params.id)
        .then(_ => res.status(200).send('Salesman deleted successfully'))
        .catch(error => res.status(400).send("Bad request: " + error))
}

/**
 * 
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
 exports.deleteAllSalesmen = function (req, res){
    salesmanService.deleteAllSalesmen()
        .then(_ => res.status(200).send('All Salesmen are deleted successfully'))
        .catch(error => res.status(400).send("Bad request: " + error))
}