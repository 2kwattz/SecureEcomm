const { poolPromise } = require('../db/sql/dbConfig.js');  



const getRegisterPage = (req,res) => {

   return res.send("Register Page")

}

const postRegisterPage = (req,res) => {

  let {firstName,lastName,email,phone,password,confirmPassword} = req.body;

  if(password !== confirmPassword){
    
    return res.status(400).json({
      "success": false,
      "error": "Passwords do not match"
    }
    )
  } 




  console.log("FIRST NAME, LNAME, EMAIL.PASSWORD,PHONE, confirmpassword", firstName,lastName,email,password,phone,confirmPassword)
  return res.status(200).send({"success":"ok"})

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