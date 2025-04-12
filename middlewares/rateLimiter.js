const rateLimit = require('express-rate-limit');

// Login attempts: Max 20 per 5 mins
const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 20,
  message: "You are trying too often. Please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Forgot Password attempts: Max 5 per 5 mins
const forgotPasswordLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  message: "You are trying too often. Please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Security Question Answers: Max 5 per day
const securityQuestionAnswerLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 5,
  message: "You are trying too often. Please try again in 24 hours.",
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  loginLimiter,
  forgotPasswordLimiter,
  securityQuestionAnswerLimiter
};
