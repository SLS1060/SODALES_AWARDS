/************************************* Project : Sodales Awards **********************************/
/* Developer Name 			  	: Sanjyot Phadatare										         */
/* Date      					: 06/03/2026                                                     */
/* Application Name             : Awards                                                         */
/* Procedure Name 				: sodalesAwardHandler.js            			                 */
/* Functionality                : All post functions which are used for add Awards               */
/*************************************************************************************************/

const cds = require('@sap/cds');
const CryptoJS = require('../lib/crypto@4.1.1');
const { executeHttpRequest } = require('@sap-cloud-sdk/http-client');

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


/**
 * Function: createCMISFolder
 * Purpose:
 * Sends a POST request to an SAP CPI (Cloud Platform Integration) endpoint to create a folder at a specified path 
 * in a remote CMIS system. It uses a destination configuration named 'CPIDestination'.
 *
 * @param {string} path - The path where the folder should be created
 * @param {string} folderName - The name of the folder to create
 */
async function createCMISFolder(path, folderName) {
  try {
    const DOC_URL = process.env.DOC_URL;

    // Send HTTP POST request to the CPI endpoint using the specified destination
    const response = await executeHttpRequest(
      { destinationName: 'CMISCPI' },    // Destination configuration name in BTP
      { 
        method: 'POST',
        url: DOC_URL,
        headers: {
          'Content-Type': 'application/json',
          'FolderPath': path,
          'FolderName': folderNames
        }
      },{
          fetchCsrfToken: false  // Prevents HEAD for CSRF
      });
    return response.status === 201 ? true : false;
  } catch (error) {
    // Log the error with fallback for missing response object
    console.error('Error folder creation : ', error.response ? error.response.data : error.message);
    // throw error;
  }
}


module.exports = {
    setValue,
    validateField,
    fetchPayload,
    createCMISFolder
}