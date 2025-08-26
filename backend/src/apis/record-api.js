const recordService = require("../services/record-service");

/**
 * 
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.getSalesmanRecords = function (req, res){
    recordService.getSalesmanRecords(req.params.sid, req.params.year)
        .then(salesman => res.send(salesman))
        .catch(_ => res.status(404).send("Record not found"))
}

/**
 * 
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.getSalesmenRecords = function (req, res){
    recordService.getSalesmenRecords(req.params.year)
        .then(salesman => res.send(salesman))
        .catch(_ => res.status(404).send("Records not found"))
}

/**
 * 
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.getLatestSalesmenRecords = function (req, res){
    recordService.getSalesmenRecords(null)
        .then(salesman => res.send(salesman))
        .catch(_ => res.status(404).send("Records not found"))
}

/**
 * 
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.getMyRecords = function (req, res){
    const user = req.session.user;
    if(!user || !user.employeeId) return new Promise(() => {
        throw new Error("Missing ID for user");
    });
    recordService.getSalesmanRecords(user.employeeId, req.params.year)
        .then(salesman => res.send(salesman))
        .catch(_ => res.status(404).send("Record not found"))
}

/**
 *
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.getMyLatestRecords = function (req, res){
    const user = req.session.user;
    if(!user || !user.employeeId) return new Promise(() => {
        throw new Error("Missing ID for user");
    });
    recordService.getLatestRecordsForSalesman(user.employeeId)
        .then(salesman => res.send(salesman))
        .catch(error => res.status(404).send(error))
}

/**
 * 
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.saveRemarks = function (req, res){
    recordService.saveRemarks(req.params.sid, req.params.year, req.body)
        .then(data => res.send(data))
        .catch(error => res.status(400).send(error))
}