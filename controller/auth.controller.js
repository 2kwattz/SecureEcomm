 const getRegisterPage = (req,res) => {

   return res.send("Register Page")

}

 const getLoginPage = (req,res) => {

    return res.send("Login Page")

}


module.exports = {
    getRegisterPage,
    getLoginPage,
  };