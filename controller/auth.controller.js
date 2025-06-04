const { poolPromise } = require('../db/sql/dbConfig.js');  // MSSQL Db Pool
const jwt = require('jsonwebtoken'); // JWT Token 
const bcrypt = require('bcryptjs');


const checkEmailExists = async (email) =>{
  try{
    // Creating db connection pool
    const pool = await poolPromise;

    const result = await pool.request()
    .input('email',email)
    .query('SELECT 1 FROM Users WHERE email = @email');

    console.log("[*] Recordset Response -  ", result)
    console.log("[*] Recordset Response - Email Validation ", result.recordset.length)
    return result.recordset.length > 0;
  }
  catch(error){
    console.log(`[*] Error in Validating Email Address in database ${error}`)
    return false;

  }
}

const getRegisterPage = (req,res) => {
   return res.send("Register Page")
}

const postRegisterPage = async (req,res) => {

  // Fetching form data from Registration page

  let {firstName,lastName,email,phone,password,confirmPassword} = req.body;
 
  console.log("FIRST NAME, LNAME, EMAIL.PASSWORD,PHONE, confirmpassword", firstName,lastName,email,password,phone,confirmPassword)
  // Validate Password locally

  if(password !== confirmPassword){
    
    return res.status(400).json({
      "success": false,
      "error": "Passwords do not match"
    }
    )
  } 

  // Validating email in database 

  const emailExistsInDatabase = await checkEmailExists(email)

  if(emailExistsInDatabase){
    console.log("emailExistsInDatabase", emailExistsInDatabase)
    return res.status(409).json({"success":false,"error":"User with that Email Address already exists"});
  }

  let hashedPassword = await bcrypt.hash(password, 8) // 8 Rounds Salt Encryption
  console.log("[*] Hashed Password ", hashedPassword);

  const pool = await poolPromise;

  const registrationResult = await pool.request()
  .input('FirstName',firstName)
  .input('LastName',lastName)
  .input('Email',email)
  .input('Gender',gender)
  .input('DateOfBirth',dob)
  .input('PhoneNumber',phone)
  .input('PasswordHash',hashedPassword)
  .query(`INSERT INTO Users (firstName, lastName, email, gender, dob, phone, password)
  VALUES (@FirstName, @LastName, @Email, @Gender, @DateOfBirth, @PhoneNumber, @PasswordHash) `);

  if(registrationResult.rowsAffected[0] === 1){
    console.log("[*] User Registered Successfully to SecureEcomm")
    return res.status(201).send({"success":true})
  }
  else{
    console.log("[*] User Registration Failed. Full Log ",registrationResult)
    return res.status(500).send({"success":false,"error":"User Registration Failed"} )
  }
  

}

 const getLoginPage = (req,res) => {

      res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login Form</title>
</head>
<body>
    <h2>Login</h2>
    <form action="/login-page" method="POST">
        <label for="email">Email:</label><br>
        <input type="email" id="email" name="email" required><br><br>
        <label for="password">Password:</label><br>
        <input type="password" id="password" name="password" required><br><br>
        <button type="submit">Login</button>
    </form>
</body>
</html>`);

}



const postLoginPage = async (req,res) => {

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

}


module.exports = {
    getRegisterPage,
    getLoginPage,
    postLoginPage,
    postRegisterPage
  };