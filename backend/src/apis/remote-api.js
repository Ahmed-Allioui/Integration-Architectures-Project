const remoteService = require("../services/remote-service");

/**
 * 
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.importSalesmen = function (req, res){
    remoteService.importSalesmen(req.params.year)
        .then(salesmen => res.send(salesmen))
        .catch(error => res.status(404).send(error))
}