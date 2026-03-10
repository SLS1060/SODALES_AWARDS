/************************************* Project : Sodales Awards **********************************/
/* Developer Name 			  	: Sanjyot Phadatare										         */
/* Date      					: 06/03/2026                                                     */
/* Application Name             : Awards                                                         */
/* Library Name 				: sodalesAwardHandler.js            			                 */
/* Functionality                : All post functions which are used for add Awards               */
/*************************************************************************************************/

const {setValue, validateField, fetchPayload, createCMISFolder } = require('../../utils/common');

// Importing cds
const cds = require('@sap/cds');

//Add Awards
async function AddAwards(req) {
    let oInput;
    try {

        let result, oAwardId;
        //Reading payload through req.data
        oInput = await fetchPayload(req);

        
        //Extracting Payload
        let oAwardDetails = oInput.AwardDetails;
        console.log(oAwardDetails.Attachments);
        let Attachments  = oAwardDetails.Attachments;
        
        if (oAwardDetails.AWRID < 0 || !Number.isInteger(oAwardDetails.AWRID)) {
            throw new 'Invalid Award Id';
        }

        result = await cds.run(`CALL "prSdlCreateUpdateAwards"(?,?,?,?,?,?,?,?,?,?,?,?,?)`, [
            setValue(oAwardDetails.AWRID),      // Primary Key Award Id
            setValue(oAwardDetails.AWARD),      // Award
            setValue(oAwardDetails.ACMNT),      // URL
            setValue(oAwardDetails.CATEG),      // Award Category
            setValue(oAwardDetails.CNAME),      // Certification Name
            setValue(oAwardDetails.NOTES),      // Notes
            setValue(oAwardDetails.STATS),      // Status
            setValue(oAwardDetails.STATS_TXT),      // Status
            setValue(oAwardDetails.REPBY),      // Reported By
            setValue(oAwardDetails.REPBY),      // Reported By NAME
            setValue(oAwardDetails.REPDT),      // Reported Date   
            setValue(oAwardDetails.AWRDT)       // Award Date
        ]);
        oAwardId = result.OAWRID;               // Output parameter
        console.log("Award Id: ", oAwardId);


        // result = await cds.run(`SELECT YEAR(CRTDT), MONTH(CRTDT) FROM SDL_T_AWRDS WHERE AWRID = ? `, [oAwardId]);

        // Year = Object.values(result[0])[0]
        // Month = Object.values(result[0])[1]

        // folderpath = Year;
        // filename = "SDL_" + oAwardId.toString();
        // if (oAwardDetails.AWRID === 0) {
        //     //Logic to Create New Folder for New Incident 
        //     CMIS_Status = await createCMISFolder(folderpath, filename);
        //     if (CMIS_Status) {
        //         await cds.run(`CALL prIncUpdateAttachmentFolderPath(?,?)`, [
        //             oAwardId,
        //             folderpath + "/" + filename]);
        //     }
        // }


        if (Array.isArray(Attachments)) {
            for (let i = 0; i < Attachments.length; i++) {
                result = await cds.run(`CALL "prSdlCreateUpdateAttachments"(?,?,?,?,?,?,?)`, [
                    setValue(Attachments[i].ATHID),    // Primary Key- Attachment Id
                    setValue(oAwardId),             // Award ID
                    setValue(Attachments[i].ATTNM),    // Attachment Name
                    setValue(Attachments[i].OBJID),    // Object ID
                    setValue(Attachments[i].TITLE),    // Document Title
                    setValue(Attachments[i].URLDT)     // URL
                ]);
                oAttachId = result.OATHID;               // Output parameter
                console.log("Attachment Id: ", oAttachId);
            }
        }
    }
    catch (error) {
         return req.error({
            code: 500,
            message: error.toString()
         });
    }
}

async function DeleteAwardsAttachments(req) {
    let oInput;
    try {
        let result;
        //Reading payload through req.data
        oInput = await fetchPayload(req);

        //Extracting Payload
        let oAwardDetails = oInput.oAwardDetails;

         result = await cds.run(`CALL "prSdlDeleteAttachments"(?,?)`, [
            setValue(oAttachmentD.AWRID),
            setValue(oAttachmentD.ATHID)
         ]);
        }
            catch (error) {
         return req.error({
            code: 500,
            message: error.toString()
         });
    }
}


async function AcceptReject(req) {
    let oInput;
    try {
        let result;
        //Reading payload through req.data
        oInput = await fetchPayload(req);

        //Extracting Payload
        let oA = oInput.Attachments;

         result = await cds.run(`CALL prSdlUpdateAwardsStatus(?,?,?)`, [
            setValue(oAwardDetails.AWRID),
            setValue(oAwardDetails.STATS),
            setValue(oAwardDetails.STATS_TXT)
         ]);
        }
            catch (error) {
         return req.error({
            code: 500,
            message: error.toString()
         });
    }
}

module.exports ={
    AddAwards,
    DeleteAwardsAttachments,
    AcceptReject
}