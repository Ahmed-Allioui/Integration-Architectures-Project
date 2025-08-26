const express = require("express");
const router = express.Router();
const { checkAuthorization } = require("../middlewares/auth-middleware");
const PERMISSIOM = require("../security/permission");
const authApi = require("../apis/auth-api");
const userApi = require("../apis/user-api");
const remoteApi = require("../apis/remote-api");
const salesmanApi = require("../apis/salesman-api");
const recordApi = require("../apis/record-api");
const socialPerformanceApi = require("../apis/social-performance-api");
const bonusApi = require("../apis/bonus-api");

/*
    In this file is the routing for the REST-endpoints under /api managed
 */

/**
 * @openapi
 * /api/login:
 *   get:
 *     description: Verify if the user is logged in
 *     responses:
 *       200:
 *         description: Sends logged-in as true if user is logged in, and false if not
 *     tags:
 *       - Auth
 */
router.get(
  "/login",
  authApi.isLoggedIn,
);

/**
 * @openapi
 * /api/login:
 *   post:
 *     description: Login a user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login the user and send the session details if cridentials are correct
 *       401:
 *         description: Login will fail if cridentials are false
 *     tags:
 *       - Auth
 */
router.post(
  "/login",
  authApi.login,
);

/**
 * @openapi
 * /api/login:
 *   delete:
 *     description: Logout a user
 *     responses:
 *       200:
 *         description: Logs out the user
 *     tags:
 *       - Auth
 */
router.delete(
  "/login",
  authApi.logout,
);

/**
 * @openapi
 * /api/user:
 *   get:
 *     description: Send details about the currently logged in user
 *     responses:
 *       200:
 *         description: Sends the logged in user
 *     tags:
 *       - User
 */
router.get(
  "/user",
  checkAuthorization(PERMISSIOM.USER.READ_SELF),
  userApi.getSelf,
);

/**
 * @openapi
 * /api/user:
 *   post:
 *     description: Adds a new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *               employeeId:
 *                 type: string
 *                 required: false
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Error occured while user creation
 *     tags:
 *       - User
 */
router.post(
  "/user",
  checkAuthorization(PERMISSIOM.USER.ADD),
  userApi.addUser,
);

/**
 * @openapi
 * /api/remote/salesman/year/:year:
 *   get:
 *     description: Import data from remote APIs for a specific year
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: Year related to data to be imported
 *     responses:
 *       200:
 *         description: Data found
 *       401:
 *         description: User is not allowed to execute the operation
 *       404:
 *         description: Data not found
 *     tags:
 *       - Remote
 */
router.get(
  "/remote/salesman/year/:year",
  checkAuthorization(PERMISSIOM.REMOTE.RECORD_IMPORT),
  remoteApi.importSalesmen,
);

/**
 * @openapi
 * /api/salesman/:id:
 *   delete:
 *     description: Delete a salesman
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the salesman to be deleted
 *     responses:
 *       200:
 *         description: Salesman deleted
 *       401:
 *         description: User is not allowed to execute the operation
 *     tags:
 *       - Salesman
 */
router.delete(
  "/salesman/:id",
  checkAuthorization(PERMISSIOM.SALESMAN.DELETE),
  salesmanApi.deleteSalesman,
);

/**
 * @openapi
 * /api/salesman:
 *   delete:
 *     description: Delete all salesmen
 *     responses:
 *       200:
 *         description: All salesman deleted
 *       401:
 *         description: User is not allowed to execute the operation
 *     tags:
 *       - Salesman
 */
router.delete(
  "/salesman",
  checkAuthorization(PERMISSIOM.SALESMAN.DELETE_ALL),
  salesmanApi.deleteAllSalesmen,
);

/**
 * @openapi
 * /api/record/year/:year/salesman/:sid:
 *   get:
 *     description: Presents records of a salesman for a specific year
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: Year of the record
 *       - in: path
 *         name: sid
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the salesman
 *     responses:
 *       200:
 *         description: Records found
 *       401:
 *         description: User is not allowed to execute the operation
 *       404:
 *         description: Records not found
 *     tags:
 *       - Record
 */
router.get(
  "/record/year/:year/salesman/:sid",
  checkAuthorization(PERMISSIOM.RECORD.READ_ALL),
  recordApi.getSalesmanRecords,
);

/**
 * @openapi
 * /api/record/year/:year/me:
 *   get:
 *     description: Presents records of the logged in salesman for a specific year
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: Year of the record
 *     responses:
 *       200:
 *         description: Records found
 *       401:
 *         description: User is not allowed to execute the operation
 *       404:
 *         description: Records not found
 *     tags:
 *       - Record
 */
router.get(
  "/record/year/:year/me",
  checkAuthorization(PERMISSIOM.RECORD.READ_MINE),
  recordApi.getMyRecords,
);

/**
 * @openapi
 * /api/record/latest/me:
 *   get:
 *     description: Presents records of the logged in salesman for the last year if it exists
 *     responses:
 *       200:
 *         description: Records found
 *       401:
 *         description: User is not allowed to execute the operation
 *       404:
 *         description: Records not found
 *     tags:
 *       - Record
 */
router.get(
    "/record/latest/me",
    checkAuthorization(PERMISSIOM.RECORD.READ_MINE),
    recordApi.getMyLatestRecords,
);

/**
 * @openapi
 * /api/record/year/:year:
 *   get:
 *     description: Presents records all salesmen saved in the database for a specific year
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: Year of the record
 *     responses:
 *       200:
 *         description: Records found
 *       401:
 *         description: User is not allowed to execute the operation
 *       404:
 *         description: Records not found
 *     tags:
 *       - Record
 */
router.get(
  "/record/year/:year",
  checkAuthorization(PERMISSIOM.RECORD.READ_ALL),
  recordApi.getSalesmenRecords,
);

/**
 * @openapi
 * /api/record/latest:
 *   get:
 *     description: Presents records of the logged in salesman from the database for the latest year
 *     responses:
 *       200:
 *         description: Returns records if found else an empty array
 *       401:
 *         description: User is not allowed to execute the operation
 *     tags:
 *       - Record
 */
router.get(
  "/record/latest",
  checkAuthorization(PERMISSIOM.RECORD.READ_ALL),
  recordApi.getLatestSalesmenRecords,
);

/**
 * @openapi
 * /api/record/year/:year/salesman/:sid/saveRemarks:
 *   post:
 *     description: Save remarks for a salesman and a specific year
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: Year of the record
 *       - in: path
 *         name: sid
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the salesman
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               remarks:
 *                 type: string
 *                 required: true
 *     responses:
 *       201:
 *         description: Remarks saved
 *       401:
 *         description: User is not allowed to execute the operation
 *       400:
 *         description: Error occured while saving remarks
 *     tags:
 *       - Record
 */
router.post(
  "/record/year/:year/salesman/:sid/saveRemarks",
  checkAuthorization(PERMISSIOM.RECORD.SAVE_REMARKS),
  recordApi.saveRemarks,
);

/**
 * @openapi
 * /api/socialPerformance/year/:year/salesman/:sid:
 *   post:
 *     description: Adds social performances to a salesman for a specific year
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: Year of the record
 *       - in: path
 *         name: sid
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the salesman
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               goalDescription:
 *                 type: string
 *                 required: true
 *               targetValue:
 *                 type: integer
 *                 required: true
 *               actualValue:
 *                 type: integer
 *                 required: true
 *     responses:
 *       201:
 *         description: Social performance saved
 *       401:
 *         description: User is not allowed to execute the operation
 *       400:
 *         description: Error occured while saving social performances
 *     tags:
 *       - Social performance
 */
router.post(
  "/socialPerformance/year/:year/salesman/:sid",
  checkAuthorization(PERMISSIOM.SOCIAL_PERFORMANCE.ADD),
  socialPerformanceApi.addSocialPerformance,
);

/**
 * @openapi
 * /api/socialPerformance/:rid/year/:year/salesman/:sid:
 *   delete:
 *     description: Deletes social performances by id of a salesman for a specific year
 *     parameters:
 *       - in: path
 *         name: rid
 *         schema:
 *           type: integer
 *         required: true
 *         description: Record ID to be deleted
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: Year of the record
 *       - in: path
 *         name: sid
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the salesman
 *     responses:
 *       201:
 *         description: Social performance saved
 *       401:
 *         description: User is not allowed to execute the operation
 *     tags:
 *       - Social performance
 */
router.delete(
  "/socialPerformance/:rid/year/:year/salesman/:sid",
  checkAuthorization(PERMISSIOM.SOCIAL_PERFORMANCE.DELETE),
  socialPerformanceApi.deleteSocialPerformance,
);

/**
 * @openapi
 * /api/socialPerformance/year/:year/salesman/:sid:
 *   delete:
 *     description: Deletes all social performances of a salesman for a specific year
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: Year of the record
 *       - in: path
 *         name: sid
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the salesman
 *     responses:
 *       201:
 *         description: Social performance saved
 *       401:
 *         description: User is not allowed to execute the operation
 *     tags:
 *       - Social performance
 */
router.delete(
  "/socialPerformance/year/:year/salesman/:sid",
  checkAuthorization(PERMISSIOM.SOCIAL_PERFORMANCE.DELETE_ALL),
  socialPerformanceApi.deleteAllSocialPerformances,
);

/**
 * @openapi
 * /api/bonus/year/:year/salesman/:sid/generate:
 *   get:
 *     description: Calculates and save bonuses in the database for a salesman in a specific year
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: Year of the record
 *       - in: path
 *         name: sid
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the salesman
 *     responses:
 *       200:
 *         description: Returns the record with the calculated bonuses
 *       401:
 *         description: User is not allowed to execute the operation
 *       400:
 *         description: Error occured while generating bonuses
 *     tags:
 *       - Bonus
 */
router.get(
  "/bonus/year/:year/salesman/:sid/generate",
  checkAuthorization(PERMISSIOM.BONUS.GENERATE),
  bonusApi.generateBonusForSalesman,
);

/**
 * @openapi
 * /api/bonus/year/:year/salesman/:sid/validate:
 *   get:
 *     description: Validates bonuses depending on the user's role (CEO or HR) for a salesman in a specific year
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: Year of the record
 *       - in: path
 *         name: sid
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the salesman
 *     responses:
 *       200:
 *         description: Bonus validated
 *       401:
 *         description: User is not allowed to execute the operation
 *       400:
 *         description: Bonus not validated
 *     tags:
 *       - Bonus
 */
router.get(
  "/bonus/year/:year/salesman/:sid/validate",
  checkAuthorization(PERMISSIOM.BONUS.VALIDATE_OR_REJECT_ALL),
  bonusApi.validateBonusForSalesman,
);

/**
 * @openapi
 * /api/bonus/year/:year/validate:
 *   get:
 *     description: Validates bonuses of the logged in salesman for a specific year
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: Year of the record
 *     responses:
 *       200:
 *         description: Bonus validated
 *       401:
 *         description: User is not allowed to execute the operation
 *       400:
 *         description: Bonus not validated
 *     tags:
 *       - Bonus
 */
router.get(
  "/bonus/year/:year/validate",
  checkAuthorization(PERMISSIOM.BONUS.VALIDATE_OR_REJECT_MINE),
  bonusApi.validateCurrentSalesmanBonus,
);

/**
 * @openapi
 * /api/bonus/year/:year/salesman/:sid/send:
 *   get:
 *     description: Sends the total bonus of a salesman and a specific year to be saved in Orange HRM
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: Year of the record
 *       - in: path
 *         name: sid
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the salesman
 *     responses:
 *       200:
 *         description: Bonus sent successfully
 *       401:
 *         description: User is not allowed to execute the operation
 *       400:
 *         description: Bonus can not be sent
 *     tags:
 *       - Bonus
 */
router.get(
  "/bonus/year/:year/salesman/:sid/send",
  checkAuthorization(PERMISSIOM.REMOTE.BONUS_SEND),
  bonusApi.sendBonusToOrangeHRM,
);

/**
 * @openapi
 * /api/bonus/year/:year/salesman/:sid/validate:
 *   delete:
 *     description: Rejects bonuses depending on the user's role (CEO or HR) for a salesman in a specific year
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: Year of the record
 *       - in: path
 *         name: sid
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the salesman
 *     responses:
 *       200:
 *         description: Bonus rejected
 *       401:
 *         description: User is not allowed to execute the operation
 *       400:
 *         description: Bonus not rejected
 *     tags:
 *       - Bonus
 */
router.delete(
  "/bonus/year/:year/salesman/:sid/validate",
  checkAuthorization(PERMISSIOM.BONUS.VALIDATE_OR_REJECT_ALL),
  bonusApi.rejectBonusForSalesman,
);

/**
 * @openapi
 * /api/bonus/year/:year/validate:
 *   delete:
 *     description: Rejects bonuses of the logged in salesman for a specific year
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: Year of the record
 *     responses:
 *       200:
 *         description: Bonus rejected
 *       401:
 *         description: User is not allowed to execute the operation
 *       400:
 *         description: Bonus not rejected
 *     tags:
 *       - Bonus
 */
router.delete(
  "/bonus/year/:year/validate",
  checkAuthorization(PERMISSIOM.BONUS.VALIDATE_OR_REJECT_MINE),
  bonusApi.rejectCurrentSalesmanBonus,
);

module.exports = router;
