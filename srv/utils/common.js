/************************************* Project : Sodales Awards **********************************/
/* Developer Name 			  	: Sanjyot Phadatare										         */
/* Date      					: 06/03/2026                                                     */
/* Application Name             : Awards                                                         */
/* Procedure Name 				: sodalesAwardHandler.js            			                 */
/* Functionality                : All post functions which are used for add Awards               */
/*************************************************************************************************/

const cds = require('@sap/cds');
const CryptoJS = require('../lib/crypto@4.1.1');

function setValue(value) {
    if (value !== undefined && value !== null && value !== '') {
        return value;
    }
    return null;
}

function validateField(value) {
    if (value !== undefined && value !== null && value !== '') {
        return true;
    } else {
        return false;
    }
}


async function fetchPayload(req) {
    try {
        // Reading payload through req.data
        payload = req.data;
        if (payload) {
            try {
                return JSON.parse(payload.D4OXYPALUYAIDNSO); // parse the JSON payload
            } catch (e) {
                const secretKey = 'XwredzyosErTjKgW';
                const decrypted = await CryptoJS.AES.decrypt(payload.D4OXYPALUYAIDNSO, secretKey);     // Decrypt the AES payload using the extracted key
                const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);                        // Convert the decrypted payload into String
                return JSON.parse(decryptedText);                                                       // Parsing the decrypted payload
            }
        } else {
            throw new Error("No data found in the request"); // Handle case where no records exist
        }
    } catch (e) {
        throw e; // throw error for handling
    }
}


module.exports = {
    setValue,
    validateField,
    fetchPayload
}