// Express Framework

const express = require('express');
const app = express()
require("dotenv").config() // Dotenv enviornment for variables

// Optimization & Compression

const compression = require('compression');
const NodeCache = require("node-cache");
// const cache = new NodeCache();


// Miscellaneous

const path = require('path')
const cookieParser = require('cookie-parser'); // The name says it all
const {dispatchEmail} = require('../services/sendEmail')

// Test Email

// dispatchEmail('forgotPassword','prakashbhatia1970@gmail.com',{
//   type: 'forgotPassword',
//   to: 'prakashbhatia1970@gmail.com',
//   data: {
//     username: "Bunty",
//     resetLink: 'https:localhost:3000/resetPassword',
//     expiryTime: 10
//   }

// })

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, '../public')));

// Database

const mongoose = require('mongoose');
const mongodb_url = process.env.DEVELOPMENT_MONGODB_URL
require('../db/conn')

// Route Endpoints

const decoyRoutes = require("../routes/decoyRoutes") // Decoy routes for confusing network sniffers & bots


// Security

const helmet = require('helmet'); // Helmet Middleware
const mongoSanitize = require('express-mongo-sanitize'); // Prevents NoSQL Attacks
const sqlInjectionGuard = require('../middlewares/sqlInjectionGuard') // Prevents SQL Attacks
const spoofedHeaders = require('../middlewares/spoofedHeaders') // Honeypot baiter
const IpBlocklist = require("../middlewares/IpBlocklist") // Blocked IP Addresses
const { loginLimiter, forgotPasswordLimiter, securityQuestionAnswerLimiter} = require('../middlewares/rateLimiter'); // Express Rate limiter

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
app.use(compression()) // GZip Compression for faster loading time

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
app.use('/', decoyRoutes); // Setting decoy routes for honeypot bait

// Redirect all Http traffic to Https in Production enviornment

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    try {

      if (!req.secure) {
        const host = req.headers.host;
        const url = req.url;

        if (!host || !url) {
          console.warn("[!] Missing headers in request, skipping redirect.");
          return next(); // Graceful degradation
        }

        const redirectUrl = `https://${host}${url}`;
        console.log(`[→] Redirecting insecure request to: ${redirectUrl}`);
        return res.redirect(301, redirectUrl); // 🔁 Permanent Redirect
      }
      next();
    } catch (error) {
      console.error("[*] HTTPS Middleware Redirect Error:", error.message);
      return next(); // Always call next() in error case
    }
  });
} else {
  console.log("\n[*] Node is in Development Environment. HTTPS Redirection not implemented.\n");
}


// Optimization



// Routes 

app.get('/', sqlInjectionGuard,(req, res) => {
    res.send('Basic Express server running.');
  });

app.post('/', sqlInjectionGuard,(req, res) => {
    res.send('Basic Express server running.');
  });

  app.listen(PORT, () => {
    console.log(`[*] NodeJs Server running on http://localhost:${PORT}`);
  });

