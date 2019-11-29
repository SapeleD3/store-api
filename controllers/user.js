const jwt = require("jsonwebtoken");
const mongoose = require('mongoose')
const httpStatus = require("http-status-codes");
const bcrypt = require('bcryptjs')
const { User, validate, validateLogin } = require("../models/user");



exports.registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    storeName,
    storeDescription,
    phone,
  } = req.body;
  const { error } = validate({
    firstName,
    lastName,
    email,
    password,
    storeName,
    storeDescription,
    phone,
  });
  if (error)
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: error.details[0].message });
    if(password !== confirmPassword) return res.status(httpStatus.PRECONDITION_FAILED).json({message: "password must match"})
  let user = await User.findOne({ email: email.toLowerCase() });
  if (user)
    return res
      .status(httpStatus.CONFLICT)
      .json({ status: "error", message: "user already registered." });
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt);
  user = new User({
    _id: new mongoose.Types.ObjectId(),
    firstName,
    lastName,
    email: email.toLowerCase(),
    password : hash,
    storeName,
    storeDescription,
    phone,
  });
  const userDetails = await user.save()
  const token = jwt.sign(
    {
        email: userDetails.email,
        _id: userDetails._id
    },
        "secret",
    {
        expiresIn: "2h"
    }
  )
  return res.status(httpStatus.OK).json({
      status: "success",
      message: token
  })
};

exports.login = async(req, res) => {
  const { email, password } = req.body;
  const { error } = validateLogin({email, password})
  if (error)
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: error.details[0].message });
   const user = await User.findOne({ email: email.toLowerCase() })
   if(user) {
    const very = await bcrypt.compare(password, user.password)
    if(very) {
        const token = jwt.sign(
            {
                email: user.email,
                _id: user._id
            },
                "secret",
            {
                expiresIn: "2h"
            }
          )
        return res.status(httpStatus.OK).json({
            status: "succes",
            message: token
        })
    }else {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "Auth Failed"
        })
    }
   }
   return res.status(httpStatus.BAD_REQUEST).json({
    message: "Auth Failed"
})
};
