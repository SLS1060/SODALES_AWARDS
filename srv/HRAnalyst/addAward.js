/************************************* Project : Sodales Awards **********************************/
/* Developer Name 			  	: Sanjyot Phadatare										         */
/* Date      					: 06/03/2026                                                     */
/* Application Name             : Awards                                                         */
/* Library Name 				: sodalesAwardHandler.js            			                 */
/* Functionality                : All post functions which are used for add Awards               */
/*************************************************************************************************/
// Import the SAP CDS runtime library to define service implementation 
const cds = require('@sap/cds');

const addAwards = require('../handlers/applications/sodalesAwardHandlers');

const {checkUserRateLimiter } = require('../middleware/rateLimitChecker');
const { isHRA } = require('../handlers/roles/roleshandler');


module.exports = cds.service.impl(function () {


    //Check RateLimit

    this.before("*",checkUserRateLimiter);

    this.before("*",isHRA);
    // Add new Award (main operation)
    this.on("b9q2fsan18bqxar0", addAwards.AddAwards);

    this.on("MenppOLcoVyeMVTg",addAwards.DeleteAwardsAttachments);

    this.on("qmU9hLZZckICSjDa",addAwards.AcceptReject);

    this.on("T5qTMWJSg36f8E6y",addAwards.createAttachment);

})
