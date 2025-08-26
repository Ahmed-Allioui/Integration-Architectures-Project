const socialPerformanceService = require("../services/social-performance-service");

/**
 * 
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
 exports.addSocialPerformance = function (req, res){
    socialPerformanceService.addSocialPerformance(req.params.sid, req.params.year, req.body)
        .then((record) => res.status(201).send(record))
        .catch(error => res.status(400).send(error))
}

/**
 * 
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
 exports.deleteSocialPerformance = function (req, res){
    socialPerformanceService.deleteSocialPerformance(req.params.sid, req.params.year, req.params.rid)
        .then(record => res.status(200).send(record))
        .catch(error => res.status(400).send(error))
}

/**
 * 
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
 exports.deleteAllSocialPerformances = function (req, res){
    socialPerformanceService.deleteAllSocialPerformances(req.params.sid, req.params.year)
        .then(record => res.status(200).send(record))
        .catch(error => res.status(400).send(error))
}