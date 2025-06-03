const sql = require('mssql');


console.log("Username:", process.env.MSSQL_USERNAME);
console.log("Password:", process.env.MSSQL_PASSWORD);
console.log("Server:", process.env.SERVER_1);
console.log("Port:", process.env.MSSQL_PORT);

const config = {
    user: process.env.MSSQL_USERNAME,
    password: process.env.MSSQL_PASSWORD,
    server: `${process.env.SERVER_1}`, // e.g., localhost or 127.0.0.1
    port: parseInt(process.env.MSSQL_PORT),
    database: process.env.MSSQL_DATABASE,
    options: {
        encrypt: false, // Set to true if you're using Azure
        trustServerCertificate: true, // Needed for self-signed certs
        // For default windows authentication
        // integratedSecurity: true 
    }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('[*] Connected to MSSQL Database');
    return pool;
  })
  .catch(err => {
    console.error('[*] MSSQL Database Connection Failed!', err);
  });

// EXPORT BOTH config and poolPromise for maximum usefulness
module.exports = {
  sql,          // export sql to write queries elsewhere if needed
  poolPromise,  // export this so your app can run queries via pool
};
