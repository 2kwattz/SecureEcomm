# Work done till now

## Security Implementations

1. Rate Limiting: Rate LImiting has been implemented to prevent API abuse.
2. Bruteforce Prevention : Bruteforce prevention mechanism implemented for login route. User's ip address, user agent and login email will be combined to create a unique key. After 10 attempts the access would be locked for 15minutes for the corresponding IP ensuring the real user is not affected
3. XSS Sanitization: Prevents Malicilious attacker's code from executing in the web application
4. SQL Injection Blocking: SQL Injection would be detected and blocked. Attacker's IP Address would be logged
5. NOSQL Injection Blocking: It would be an SQL Database. NoSQL Injection prevention just to confuse the attacker
   
