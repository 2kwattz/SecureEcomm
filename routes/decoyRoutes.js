const express = require('express');
const router = express.Router();


// ROUTES
router.get('/wp-admin', (req, res) => {
    res.send('');
  });

  router.get('/wp-admin.php', (req, res) => {
    res.send('');
  });

  router.get('/index.php', (req, res) => {
    res.send('');
  });
  

  router.get('/admin', (req, res) => {
    res.send('');
  });
  router.get('/api/v1/secret-key', (req, res) => {
    console.log(`⚠️ DECOY ALERT: ${req.ip} accessed /api/v1/secret-key`);
    res.status(401).send("Unauthorized: Invalid API Key.");
  });


  router.get('/wp-login.php', (req, res) => {
    res.send(`
      <html>
        <head><title>Log In ‹ My WordPress Site — WordPress</title></head>
        <body><h1>WordPress Login</h1><form>Username: <input/><br>Password: <input type="password"/><br><button>Login</button></form></body>
      </html>
    `);
  });
  

  // wp-json
router.get('/wp-json', (req, res) => {
    res.json({
      name: "WordPress Site",
      description: "Just another WordPress site",
      url: "https://example.com"
    });
  });

  router.get('/wp-content/*', (req, res) => {
    res.status(404).send("File not found");
  });

  // xmlrpc.php - simulate XML parse failure
router.post('/xmlrpc.php', (req, res) => {
    res.status(200).send(`<?xml version="1.0"?><methodResponse><fault><value><struct><member><name>faultCode</name><value><int>32700</int></value></member><member><name>faultString</name><value><string>parse error. not well formed</string></value></member></struct></value></fault></methodResponse>`);
  });
  
  // wp-config.php - fake config file
  router.get('/wp-config.php', (req, res) => {
    res.status(403).send("Access denied.");
  });
  
  // readme.html
  router.get('/readme.html', (req, res) => {
    res.send('<h1>Welcome to WordPress</h1><p>Version 5.8.1</p>');
  });
  
  // license.txt
  router.get('/license.txt', (req, res) => {
    res.send("WordPress is free software, licensed under the GPL.");
  });
  
  // wp-includes
  router.get('/wp-includes/*', (req, res) => {
    res.status(404).send("404 Not Found");
  });
  
  // wp-content/uploads
  router.get('/wp-content/uploads/*', (req, res) => {
    res.status(404).send("File not found");
  });
  
  // sitemap.xml
  router.get('/sitemap.xml', (req, res) => {
    res.status(200).send(`<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`);
  });
  
  
  
  // EXPORT ROUTER
  module.exports = router;