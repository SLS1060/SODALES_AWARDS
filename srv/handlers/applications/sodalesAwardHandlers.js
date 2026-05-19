/************************************* Project : Sodales Awards **********************************/
/* Developer Name 			  	: Sanjyot Phadatare										         */
/* Date      					: 06/03/2026                                                     */
/* Application Name             : Awards                                                         */
/* Library Name 				: sodalesAwardHandler.js            			                 */
/* Functionality                : All post functions which are used for add Awards               */
/*************************************************************************************************/

const { setValue, validateField, fetchPayload, createCMISFolder,createErrorLog,createAuditLog } = require('../../utils/common');

// Importing cds
const cds = require('@sap/cds');

// Importing constant values
const constants = require('../../utils/constants');
//Add Awards
async function AddAwards(req) {
    let oInput, returnObj;
    try {

        let result, oAwardId;
        //Reading payload through req.data
        oInput = await fetchPayload(req);


        //Extracting Payload
        let oAwardDetails = oInput.AwardDetails;
       
        // let Attachments = oAwardDetails.Attachments;

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
            setValue(oAwardDetails.RBYNM),      // Reported By NAME
            setValue(oAwardDetails.REPDT),      // Reported Date   
            setValue(oAwardDetails.AWRDT)       // Award Date
        ]);
        oAwardId = result.OAWRID;               // Output parameter
       


        result = await cds.run(`SELECT YEAR(CRTDT), MONTH(CRTDT) FROM SDL_T_AWRDS WHERE AWRID = ? `, [oAwardId]);

        Year = Object.values(result[0])[0]
        Month = Object.values(result[0])[1]

        folderpath = Year;
        filename = "SDL_" + oAwardId.toString();
        //console.log(folderpath, filename);
        if (oAwardDetails.AWRID === 0) {
            //Logic to Create New Folder for New Incident 
            CMIS_Status = await createCMISFolder(folderpath, filename);
            if (CMIS_Status) {
                await cds.run(`CALL prsDLUpdateAttachmentFolderPath(?,?)`, [
                    oAwardId,
                    folderpath + "/" + filename]);
            }
        }
            

        await createAuditLog(oAwardId, oAwardId, 'Award Id', 'addAwards', JSON.stringify(oInput));
        returnObj = {
            "AWRID": oAwardId.toString(),
            "AttachmentStatus": CMIS_Status || true,
            "AttachmentPath": folderpath + "/" + filename,
        };

        return JSON.stringify(returnObj);
    }
    catch (error) {
        await createErrorLog(constants.APP_NAME_REPORT, 'addAwards', JSON.stringify(oInput), error.toString());
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

        await createAuditLog(oAttachmentD.AWRID, oAttachmentD.ATHID, 'Attachment Id', 'DeleteAwardsAttachments', JSON.stringify(oInput));
        returnObj = {
            "Success": "Awards Attachment Deleted Successfully"
        }

        return JSON.stringify(returnObj);
    }
    catch (error) {
        await createErrorLog(constants.APP_NAME_REPORT, 'DeleteAwardsAttachments', JSON.stringify(oInput), error.toString());
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
        let oAwardDetails = oInput.AwardDetails;

        result = await cds.run(`CALL prSdlUpdateAwardsStatus(?,?,?)`, [
            setValue(oAwardDetails.AWRID),
            setValue(oAwardDetails.STATS),
            setValue(oAwardDetails.STATS_TXT)
        ]);
        await createAuditLog(oAwardDetails.AWRID, oAwardDetails.AWRID, 'Award Id', 'AcceptReject', JSON.stringify(oInput));

        returnObj = {
            "Success": "Success"
        };

        return JSON.stringify(returnObj);

    }
    catch (error) {
        await createErrorLog(constants.APP_NAME_REPORT, 'AcceptReject', JSON.stringify(oInput), error.toString());
        return req.error({
            code: 500,
            message: error.toString()
        });
    }
}


async function createAttachment(req) {
    let oInput, returnObj;
    try {
        let result;
        oInput = await fetchPayload(req);
        // Extracting Payload
        let Attachments = oInput.AwardDetails_Attach;
        // let Attachments = OAwardDetails_Attach.Attachments;

        if (Array.isArray(Attachments)) {
            for (let i = 0; i < Attachments.length; i++) {
                result = await cds.run(`CALL "prSdlCreateUpdateAttachments" (?,?,?,?,?,?,?)`, [
                    setValue(Attachments[i].ATHID),    // Primary Key- Attachment Id
                    setValue(Attachments[i].AWRID),             // Award ID
                    setValue(Attachments[i].ATTNM),    // Attachment Name
                    setValue(Attachments[i].OBJID),    // Object ID
                    setValue(Attachments[i].TITLE),    // Document Title
                    setValue(Attachments[i].URLDT)     // URL
                ]);
                oAttachId = result.OATHID;               // Output parameter
                
            }
        }
        await createAuditLog(Attachments[0].AWRID, oAttachId, 'Attachment Id', 'createAttachment', JSON.stringify(oInput));
        
        returnObj = {
            "Success": "Attachment added successfully.",
            "Attachment ID": Attachments[0].AWRID
        };

        return JSON.stringify(returnObj);

    } catch (error) {
        await createErrorLog(constants.APP_NAME_REPORT, 'createAttachment', JSON.stringify(oInput), error.toString());
        return req.error({
            code: 500,
            message: error.toString()
        });

    }
}



module.exports = {
    AddAwards,
    DeleteAwardsAttachments,
    AcceptReject,
    createAttachment
}