const express = require('express');
const router = express.Router();

// Middleware imports
const sqlInjectionGuard = require('../middlewares/sqlInjectionGuard'); // adjust the path
const bruteforceMiddleware = require('../middlewares/bruteforceMiddleware'); // adjust the path

// GET: Simulate server crash
router.get('/error500', (req, res, next) => {
  next(new Error('Internal Server Error'));
});

// GET: Home
router.get('/', sqlInjectionGuard, bruteforceMiddleware, (req, res) => {
  res.send('Basic Express server running.');
});

// POST: Home
router.post('/', sqlInjectionGuard, (req, res) => {
  res.send('Basic Express server running.');
});

// GET: Login Form
router.get('/login', (req, res) => {
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
</html>`);
});

// POST: Login handler
router.post('/login', bruteforceMiddleware, async (req, res) => {
  try {
    const { email, password } = req.body;
    const realPassword = "12345678";

    if (password !== realPassword) {
      await req.bruteforce.fail();
      console.log(`[*] Login Failed`);
      return res.status(401).json({ message: "Invalid credentials" });
    } else {
      await req.bruteforce.success();
      res.status(200).json({ message: "Logged in successfully" });
    }
  } catch (error) {
    console.log("[*] Error in Login POST Route ", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
