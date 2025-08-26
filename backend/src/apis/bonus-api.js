const bonusService = require("../services/bonus-service");

/**
 * 
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
 exports.generateBonusForSalesman = function (req, res){
    bonusService.generateSalesmanBonus(req.params.sid, req.params.year)
        .then(record => res.status(200).send(record))
        .catch(error => res.status(400).send(error))
}

/**
 * 
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.validateBonusForSalesman = function (req, res){
    bonusService.validateBonus(req.session.user, req.params.sid, req.params.year)
        .then(record => res.status(200).send(record))
        .catch(error => res.status(400).send(error))
}

/**
 * 
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.rejectBonusForSalesman = function (req, res){
    bonusService.rejectBonus(req.session.user, req.params.sid, req.params.year)
        .then(record => res.status(200).send(record))
        .catch(error => res.status(400).send(error))
}

/**
 * 
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.validateCurrentSalesmanBonus = function (req, res){
    bonusService.validateCurrentSalesmanBonus(req.session.user, req.params.year)
        .then(record => res.status(200).send(record))
        .catch(error => res.status(400).send(error))
}

/**
 * 
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.rejectCurrentSalesmanBonus = function (req, res){
    bonusService.rejectCurrentSalesmanBonus(req.session.user, req.params.year)
        .then(record => res.status(200).send(record))
        .catch(error => res.status(400).send(error))
}

/**
 * 
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.sendBonusToOrangeHRM = function (req, res){
    bonusService.sendBonusToOrangeHRM(req.params.sid, req.params.year)
        .then(data => res.status(200).send(data))
        .catch(error => res.status(400).send(error))
}