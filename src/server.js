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



// Database

const mongoose = require('mongoose');
const mongodb_url = process.env.DEVELOPMENT_MONGODB_URL
require('../db/conn')

// Route Endpoints

const decoyRoutes = require("../routes/decoyRoutes") // Decoy routes for confusing network sniffers & bots


// Security
const csrf = require('csurf');
const helmet = require('helmet'); // Helmet Middleware
const mongoSanitize = require('express-mongo-sanitize'); // Prevents NoSQL Attacks
const sqlInjectionGuard = require('../middlewares/sqlInjectionGuard') // Prevents SQL Attacks
const spoofedHeaders = require('../middlewares/spoofedHeaders') // Honeypot baiter
const IpBlocklist = require("../middlewares/IpBlocklist") // Blocked IP Addresses
const { loginLimiter, forgotPasswordLimiter, securityQuestionAnswerLimiter} = require('../middlewares/rateLimiter'); // Express Rate limiter
const bruteforceMiddleware = require('../middlewares/bruteforceMiddleware')
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
app.use(express.urlencoded({ extended: true })); // Body Parser
app.set('trust proxy', true); // Allows Express to look at X-Forwarded-For header to get Client's IP Address
app.use(compression()) // GZip Compression for faster loading time
// app.use(csrf({ cookie: true }));
// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, '../public')));

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
        return res.redirect(301, redirectUrl); // Permanent Redirect
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

app.get('/error500', (req, res, next) => {
  // Simulate a server crash
  next(new Error('Internal Server Error'));
});


app.get('/', sqlInjectionGuard,bruteforceMiddleware,(req, res) => {
    res.send('Basic Express server running.');
  });

  app.get('/login', (req,res) => {
res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login Form</title>
</head>
<body>

    <h2>Login</h2>
    <form action="/login" method="POST">
        <label for="email">Email:</label><br>
        <input type="email" id="email" name="email" required><br><br>

        <label for="password">Password:</label><br>
        <input type="password" id="password" name="password" required><br><br>

        <button type="submit">Login</button>
    </form>

</body>
</html>
`)
  })

  app.post('/login', bruteforceMiddleware, async (req,res)=>{

    try{

      const password = req.body.password;
      const email = req.body.email;
  
      const realPassword = "12345678"
  
      if(password !== realPassword){
        await req.bruteforce.fail()
        console.log(`[*] Login Failed `)
        return res.status(401).json({ message: "Invalid credentials" });
      }
      else{
        await req.bruteforce.success();
        res.status(200).json({ message: "Logged in successfully" });
      }
    }

    catch(error){
      console.log("[*] Error in Login POST Route ",error)
    }
  })
app.post('/', sqlInjectionGuard,(req, res) => {
    res.send('Basic Express server running.');
  });


  app.use((err, req, res, next) => {
    console.error(err.stack);
  
    const status = err.status || 500;
  
    switch (status) {
      case 400:
        res.status(400).send('400 - Bad Request');
        break;
      case 401:
        res.status(401).send('401 - Unauthorized');
        break;
      case 403:
        res.status(403).send('403 - Forbidden');
        break;
      case 404:
        res.status(404).send('404 - Not Found');
        break;
      case 500:
      default:
        res.status(500).send('500 - Internal Server Error');
        break;
    }
  });
  
    // catch-all 404 (must come last)
    app.use((req, res) => {
      res.status(404).send('404 - Not Found');
    });
  



  // Server Listening

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[*] NodeJs Server running on ${PORT} `);
  });

