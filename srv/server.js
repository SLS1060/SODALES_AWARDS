// const env = process.env.NODE_ENV || 'development';

// if (env !== 'production') {
//   require('dotenv').config({ path: '/home/user/projects/COWNT_INC/db/.env' });
// }

const cds = require("@sap/cds");
const cov2ap = require("@cap-js-community/odata-v2-adapter");

cds.on("bootstrap", (app) => {

  // Add OData V2 Adapter middleware
  app.use(cov2ap());
});


module.exports = cds.server;