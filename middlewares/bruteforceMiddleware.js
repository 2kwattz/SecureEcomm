const redis = require('redis');
const client = redis.createClient(); // Connecting to Redis
const useragent = require('useragent');

// Login Bruteforce Prevention

const MAX_LOGIN_ATTEMPTS = 10; // Max failed login attempts
const BLOCKED_TIME = 600; // Blocked for 10 minutes

// Sever-side device fingerprinting generation

const generateServersideFingerprint = (req) => {
    const ip = req.ip || req.connection.remoteAddress; // To get client's IP Address
    const userAgent = req.get('User-Agent'); // To get user agent headers
    const language = req.get('Accept-Language');

    const agent = useragent.parse(userAgent)

    const fingerprint = `${ip} | ${agent.family} | ${agent.os} | ${language}`
    console.log("User Fingerprint", fingerprint)

    return fingerprint;
}

const bruteforceMiddleware = async(req,res,next) => {

    // Fetching IP Addresses of the suspicious user
    const ip = req.ip || req.connection.remoteAddress;
    const deviceFingerprint = generateServersideFingerprint(req);
    console.log(deviceFingerprint)
    next()

}

module.exports =  bruteforceMiddleware