// dbConfig.js
const sql = require('mssql');

const config = {
    user: 'your_db_username',
    password: 'your_db_password',
    server: 'your_server_or_ip', // e.g., localhost or 127.0.0.1
    database: 'your_db_name',
    options: {
        encrypt: false, // Set to true if you're using Azure
        trustServerCertificate: true // Needed for self-signed certs
    }
};

module.exports = config;
