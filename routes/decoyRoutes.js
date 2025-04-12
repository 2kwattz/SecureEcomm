// DECOY ROUTES FOR HONEYPOT BAIT

const express = require('express');
const router = express.Router();

// Fake route: Simulate WordPress admin dashboard
router.get('/wp-admin', (req, res) => {
    res.send('');
});

// Fake route: Simulate direct PHP access to wp-admin

router.get('/wp-admin.php', (req, res) => {
    res.send('');
});

// Fake route: Simulate index.php access

router.get('/index.php', (req, res) => {
    res.send('');
});

// Fake route: Simulate generic admin panel

router.get('/admin', (req, res) => {
    res.send('');
});

// Decoy API route to bait unauthorized access
router.get('/api/v1/secret-key', (req, res) => {
    console.log(`⚠️ DECOY ALERT: ${req.ip} accessed /api/v1/secret-key`);
    res.status(401).send("Unauthorized: Invalid API Key.");
});

// Fake WordPress login page
router.get('/wp-login.php', (req, res) => {
    res.send(`
    <html>
      <head><title>Log In ‹ My WordPress Site — WordPress</title></head>
      <body>
        <h1>WordPress Login</h1>
        <form>
          Username: <input/><br>
          Password: <input type="password"/><br>
          <button>Login</button>
        </form>
      </body>
    </html>
  `);
});

// Fake WordPress JSON API endpoint
router.get('/wp-json', (req, res) => {
    res.json({
        name: "WordPress Site",
        description: "Just another WordPress site",
        url: "https://example.com"
    });
});

// Fake xmlrpc.php endpoint to simulate XML parser error
router.post('/xmlrpc.php', (req, res) => {
    res.status(200).send(`<?xml version="1.0"?><methodResponse><fault><value><struct><member><name>faultCode</name><value><int>32700</int></value></member><member><name>faultString</name><value><string>parse error. not well formed</string></value></member></struct></value></fault></methodResponse>`);
});

// Fake wp-config.php to simulate access denial
router.get('/wp-config.php', (req, res) => {
    res.status(403).send("Access denied.");
});

//  Fake readme.html file
router.get('/readme.html', (req, res) => {
    res.send('<h1>Welcome to WordPress</h1><p>Version 5.8.1</p>');
});

// Fake license.txt file
router.get('/license.txt', (req, res) => {
    res.send("WordPress is free software, licensed under the GPL.");
});
// Fake path for wp-content assets
router.get('/wp-content/:file', (req, res) => {
    res.status(404).send("File not found");
});

// Fake path for wp-includes files
router.get('/wp-includes/:file', (req, res) => {
    res.status(404).send("404 Not Found");
});

// Fake path for uploaded media
router.get('/wp-content/uploads/:file', (req, res) => {
    res.status(404).send("File not found");
});

// Fake sitemap.xml
router.get('/sitemap.xml', (req, res) => {
    res.status(200).send(`<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`);
});

// Export the router to be used in server.js
module.exports = router;
