/************************************* Project : Sodales Awards **********************************/
/* Developer Name 			  	: Sanjyot Phadatare										         */
/* Date      					: 20/04/2026                                                     */
/* Application Name             : Training Form                                                         */
/* Library Name 				: trainingFormHandlers.js            			                 */
/* Functionality                : All post functions which are used for add Training Form               */
/*************************************************************************************************/

// Import the SAP CDS runtime library to define service implementation 
const cds = require('@sap/cds');

const { checkUserRateLimiter } = require('../middleware/rateLimitChecker');

const addForms = require('../handlers/applications/trainingFormHandlers');
const { isHR } = require('../handlers/roles/roleshandler');

module.exports = cds.service.impl(function () {


    //Check RateLimit
     this.before("*",checkUserRateLimiter);

     this.before("*",isHR);

     this.on("nnj2SMfWpAxlxnnk",addForms.addTrainingForm );

     //Acept Reject Status
     this.on("qmU9hLZZckICSjDa",addForms.AcceptReject);
});