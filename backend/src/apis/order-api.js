const orderService = require("../services/order-service.js");

/**
 * 
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
 exports.deleteAllOrders = function (req, res){
    orderService.deleteAllOrders(req.params.sid, req.params.year)
        .then(_ => res.status(200).send('All Orders deleted successfully'))
        .catch(error => res.status(400).send(error))
}