# Work done till now

## Security Implementations

1. Rate Limiting: Rate LImiting has been implemented to prevent API abuse.
2. Bruteforce Prevention : Bruteforce prevention mechanism implemented for login route. User's ip address, user agent and login email will be combined to create a unique key. After 10 attempts the access would be locked for 15minutes for the corresponding IP ensuring the real user is not affected
3. XSS Sanitization: Prevents Malicilious attacker's code from executing in the web application
4. SQL Injection Blocking: SQL Injection would be detected and blocked. Attacker's IP Address would be logged
5. NOSQL Injection Blocking: It would be an SQL Database. NoSQL Injection prevention just to confuse the attacker
6. IP Blocking Mechanism : Partially Implemented., Used to block IP Addresses from visiting the web app temporarily or permenantly based on conditions yet to implement
7. HTTPS Enforcement : Enforced https redirection in production mode
8. Prevention against common attacks: Added protection against common web vulnerbilities such as clickjacking, MIME Sniffing,XSS, CSRF attacks etc.
9. Service Information Spoofing : Details about the server and technology is hidden and spoofed as PHP/Wordpress for honeypot baiting. Some decoy wordpress pages have been created for the same
10. CORS Implementation : CORS have been implemented for authorized API usage and to prevent abuse.

## Emails

1. Basic Email configuration has been set to send emails from the web application.
2. Email Templates for account creation, Password reset link, Order created has been done. Backend logic to send email based on 'type' for the same has been configured

## Database

1. MSSQL Database has been connected and configured for the Nodejs server
   
