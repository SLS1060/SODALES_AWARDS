/******************************************* Project Name: Incident Management ****************************************************/
/* Developer Name           : Deependra S., Gopal B., Katyayini G.
/* Date                     : 14-08-2025
/* Application Name         : Report Incident
/* Library Name             : reportIncident.js
/* Functionality            : all post and before hook functions which are used for create incident for role 1
/*********************************************************************************************************************************/
const {handleExceedUser} = require('../utils/common');
const rateLimitStore = new Map();
 
async function checkUserRateLimiter(req) {
  const userId = req.user?.id || 'anonymous';
  const key = `${userId}`;
  const now = Date.now();
  const windowMs = 5 * 1000;
  const maxRequests = 500;
 
  let entry = rateLimitStore.get(key);
  if (!entry) {
    entry = { count: 1, startTime: now };
    rateLimitStore.set(key, entry);
  } else {
    if (now - entry.startTime < windowMs) {
      entry.count++;
      console.log(`Rate limit count for user: ${userId} and count is : ${entry.count}`);
      if (entry.count > maxRequests) {
        console.log(`Rate limit exceeded for user: ${userId}`);
        await handleExceedUser(req);
        req.reject(429, 'Rate limit exceeded. Your access has been revoked.');
      }
    } else {
      entry.count = 1;
      entry.startTime = now;
    }
  }
}
 
module.exports = { checkUserRateLimiter };
 