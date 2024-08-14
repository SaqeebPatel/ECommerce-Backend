const mongoose = require("mongoose");
const UserModel = require("../models/userModel");

async function register(req, res) {
  const { username, email, password, mobileNumber, role } = req.body;
  console.log(req.body);
  try {
    const user = await UserModel.findOne({email})
    if(user){
      return res.status(400).send("username or email already exists");
    }else{
      const newUser = new UserModel({
        username,
        email,
        password,
        mobileNumber,
        role
      });
      await newUser.save();
      return res.status(201).send("new user has been registered");
    }
  } catch (error) {
    res.status(400).send(error);
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).send({ error: "Invalid login credentials" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = { register, login };