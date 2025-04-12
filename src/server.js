// Express Framework

const express = require('express');
const app = express()
require("dotenv").configure() // Dotenv enviornment for variables

// Route Endpoints

const decoyRoutes = require("../routes/decoyRoutes") // Decoy routes for confusing network sniffers & bots

// Security

const helmet = require('helmet'); // Helmet Middleware
const rateLimit = require('express-rate-limit'); // Express Rate Limiter
const mongoSanitize = require('express-mongo-sanitize');
const sqlInjectionGuard = require('../middlewares/sqlInjectionGuard')
const spoofedHeaders = require('../middlewares/spoofedHeaders')
const IpBlocklist = require("../middlewares/IpBlocklist")
const { loginLimiter, forgotPasswordLimiter, securityQuestionAnswerLimiter} = require('../middlewares/rateLimiter');

// Disable Express's default X-Powered-By header
app.disable('x-powered-by');

const cors = require('cors');
  
// PORT

const PORT = process.env.PORT || 3000   

// Middlewares

// Helmet is a collection of small middleware functions that set HTTP headers
// to secure your app from common web vulnerabilities such as: Cross-Site Scripting (XSS), Clickjacking
// MIME sniffing, Protocol downgrade attacks, Cross-Origin data leaks

app.use(express.json()); // JSON Parser
app.set('trust proxy', true); // Allows Express to look at X-Forwarded-For header to get Client's IP Address

// Patch: redefine req.query to be mutable
app.use((req, res, next) => {
    const queryClone = Object.assign({}, req.query);
    Object.defineProperty(req, 'query', {
      value: queryClone,
      writable: true,
      enumerable: true,
      configurable: true,
    });
    next();
  });

app.use(mongoSanitize()); // Protection against NoSQL Injection Attacks
app.use(helmet()); // Helmet's common web vulnerbility security
app.use(sqlInjectionGuard); // Protection against SQL Injection Attacks
app.use(spoofedHeaders) /// Express Header Mask
app.use(IpBlocklist) // Prevents Blocked IP Addresses to access the web application

// Redirect all Http traffic to Https in Production enviornment

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (!req.secure) return res.redirect('https://' + req.headers.host + req.url);
    next();
  });
}

else{
  console.log("[*] Node is in Development Enviornment. HTTPS Redirection not implemented.\n")
}
// Routes 

app.get('/', sqlInjectionGuard,(req, res) => {
    res.send('Basic Express server running.');
  });

app.post('/', sqlInjectionGuard,(req, res) => {
    res.send('Basic Express server running.');
  });



  app.listen(PORT, () => {
    console.log(`NodeJs Server running on http://localhost:${PORT}`);
  });

