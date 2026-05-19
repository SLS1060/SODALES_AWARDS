/************************************* Project : Sodales Awards **********************************/
/* Developer Name 			  	: Sanjyot Phadatare										         */
/* Date      					: 06/03/2026                                                     */
/* Application Name             : Training Form                                                  */
/* Library Name 				: trainingFormHandlers.js            			                 */
/* Functionality                : All post functions which are used for add Training Form        */
/*************************************************************************************************/
const { setValue, validateField, fetchPayload,createErrorLog,createAuditLog } = require('../../utils/common');

// Importing cds
const cds = require('@sap/cds');

// Importing constant values
const constants = require('../../utils/constants');
const { json } = require('@sap/cds/lib/compile/parse');


async function addTrainingForm(req){

     let oInput, returnObj;
    try {

        let result, oAwardId;
        //Reading payload through req.data
        oInput = await fetchPayload(req);

        let oFormDetails = oInput.FormDetails;

        if(oFormDetails.TRAID < 0 || !Number.isInteger(oFormDetails.TRAID)){
            throw new 'Invalid Training Form ID';
        }

        if(validateField(oFormDetails.TRAID) && (oFormDetails.TDATE) && (oFormDetails.TTYPE) && (oFormDetails.TOPIC) && oFormDetails.TNAME){
            
        }
        else{
            throw new `Mandatory Field is empty (FormDetails) : ${JSON.stringify(oFormDetails)}`;
        }
        result = await cds.run(`CALL prSdlCreateUpdateTrainingForm(?,?,?,?,?,?,?,?)`,[
            setValue(oFormDetails.TRAID),
            setValue(oFormDetails.TDATE),
            setValue(oFormDetails.TTYPE),
            setValue(oFormDetails.TOPIC),
            setValue(oFormDetails.TROLE),
            setValue(oFormDetails.WILRN),
            setValue(oFormDetails.TNAME)
        ]);
        let oTRAID = result.OTRAID;
        // console.log("Training ID: ",oTRAID);

        await createAuditLog(oTRAID, oTRAID, 'Training ID', 'addForm', JSON.stringify(oInput));

        returnObj = {
            "TRAID": oTRAID.toString(),
        };

        return JSON.stringify(returnObj);

}
catch(error){
    await createErrorLog('TrainingForm', 'addForm', JSON.stringify(oInput), error.toString());
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
        let oFormDetails = oInput.FormDetails;

        result = await cds.run(`CALL prSdlUpdateTrainingFormStatus(?,?,?)`, [
            setValue(oFormDetails.TRAID),
            setValue(oFormDetails.STATS),
            setValue(oFormDetails.STATS_TXT)
        ]);
        await createAuditLog(oFormDetails.TRAID, oFormDetails.TRAID, 'Training Form ID', 'AcceptReject', JSON.stringify(oInput));

        returnObj = {
            "Success": "Success"
        };

        return JSON.stringify(returnObj);

    }
    catch (error) {
        await createErrorLog(TrainingForm, 'AcceptReject', JSON.stringify(oInput), error.toString());
        return req.error({
            code: 500,
            message: error.toString()
        });
    }
}

module.exports ={
    addTrainingForm,
    AcceptReject
}