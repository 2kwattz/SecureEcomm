// By default, Express exposes this: "X-Powered-By: Express"  Which is dumb. You're just telling attackers what you’re running on
// From a security point of view. We need to hide the original services details from the client/user

const spoofedHeaders = (req, res, next) => {
    // Fake server info
    res.setHeader('Server', 'IIS/5.1'); // Windows XP Classic
    res.setHeader('X-Powered-By', 'PHP/4.2.0'); // Old af
    res.setHeader('X-Backend-Engine', 'WordPress 1.5');
    res.setHeader('X-CMS', 'Drupal 6.0');
  
    // Random weird headers
    res.setHeader('X-Nginx-Version', '0.3.2');
    res.setHeader('X-Apache-Mod', 'mod_php/3.0.1');
    res.setHeader('X-Database', 'MS Access');
  
    next();
  };
  
  module.exports = spoofedHeaders;
  