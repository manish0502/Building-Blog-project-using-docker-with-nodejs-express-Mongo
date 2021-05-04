const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashpassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      password: hashpassword,
    });
    req.session.user = newUser;
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        status: "error",
        msg: "user not found",
      });
     }
      const isCorrect = await bcrypt.compare(password,user.password);
       if(isCorrect) {

        req.session.user = user;
        res.status(200).json({
               status: "success",
               msg:"User has been logged in successfully"
           })
       }
       else {
           res.status(400).json({
               status:"fail",
               msg:"incorrect username or password"
           })
       }
     
    
  } catch (err) {}
};
