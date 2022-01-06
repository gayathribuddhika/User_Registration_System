const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const codes = require("../constants/common");
const msg = require("../constants/message");
const User = require("../models/user");

// create a user
const createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError(msg.STATUS_MESSAGE.InvalidInput, codes.STATUS_CODE.UnprocessableEntity)
    );
  }

  const {
    firstName,
    lastName,
    username,
    password,
    dateOfBirth,
    email,
    country,
    state,
    phoneNumber,
    mobileNumber
    // contactNumber
    
  } = req.body;

  // Checking username is already exist
  let hasUsername;
  try {
    hasUsername = await User.findOne({ username: username });
  } catch (err) {
    const error = new HttpError(msg.STATUS_MESSAGE.ServerError, codes.STATUS_CODE.InternalServerError);
    return next(error);
  }
  
  if (hasUsername) {
    const error = new HttpError(msg.STATUS_MESSAGE.ExistUsername, codes.STATUS_CODE.UnprocessableEntity);
    return next(error);
  }

  //Checking email is already exist
  let hasEmail;
  try {
    hasEmail = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(msg.STATUS_MESSAGE.ServerError, codes.STATUS_CODE.InternalServerError);
    return next(error);
  }

  if (hasEmail) {
    const error = new HttpError(msg.STATUS_MESSAGE.ExistEmail, codes.STATUS_CODE.UnprocessableEntity);
    return next(error);
  }
 
  // creatting a new user
  const newUser = new User({
    firstName,
    lastName,
    username,
    password,
    dateOfBirth,
    email,
    country,
    state,
    contactNumber:{
      phoneNumber,
      mobileNumber
    }
  });

  // password encryption
  const salt = await bcrypt.genSalt(12);
  newUser.password = await bcrypt.hash(newUser.password, salt);

  try {
    await newUser.save();
  } catch (err) {
    const error = new HttpError(msg.STATUS_MESSAGE.CreateUserfaild, codes.STATUS_CODE.InternalServerError);
    return next(error);
  }
  res.status(codes.STATUS_CODE.Success).json({ user: newUser, message: msg.STATUS_MESSAGE.Succ_add});
};

// fetch all registered users
const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    const error = new HttpError(msg.STATUS_MESSAGE.GetUserFaild, codes.STATUS_CODE.InternalServerError);
    return next(error);
  }
  res.status(codes.STATUS_CODE.Success).json(users);
}

// delete a user
const deleteUser = async (req, res, next) => {
  let user;
  try {
    user = await User.findById({_id: req.params.id});
    // console.log(user);
  } catch (err) {
    const error = new HttpError(msg.STATUS_MESSAGE.DeleteUserFaild, codes.STATUS_CODE.InternalServerError);
    return next(error);
  }
  if (!user) {
    const error = new HttpError(msg.STATUS_MESSAGE.UserNotFound, codes.STATUS_CODE.NotFound);
    return next(error);
  }
  await User.deleteOne(user);
  res.status(codes.STATUS_CODE.Success).json({message: msg.STATUS_MESSAGE.Succ_delete});
}

// update a user
const updateUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError(msg.STATUS_MESSAGE.InvalidInput, codes.STATUS_CODE.UnprocessableEntity)
    );
  }

  const {
    firstName,
    lastName,
    username,
    password,
    dateOfBirth,
    email,
    country,
    state,
    
  } = req.body;

  const _id = req.params.id;

  let allUsers;
  try {
    allUsers = await User.find();
  } catch (error) {
    const err = new HttpError(msg.STATUS_MESSAGE.GetUserFaild, codes.STATUS_CODE.InternalServerError);
    return next(error);
  }

  let restUsers = allUsers.filter((user) => user.id !== _id);

  //Checking username is already exist
  let hasUsername = restUsers.find((user) => user.username === username);
  if (hasUsername) {
    const error = new HttpError(msg.STATUS_MESSAGE.UpdateUsernameFaild, codes.STATUS_CODE.InternalServerError);
    return next(error);
  }

  //Checking email is already exist
  let hasEmail = restUsers.find((user) => user.email === email);
  if (hasEmail) {
    const error = new HttpError(msg.STATUS_MESSAGE.UpdateEmailFaild, codes.STATUS_CODE.InternalServerError);
    return next(error);
  }

  let user;
  try {
    user = await User.findById({_id: req.params.id});
  } catch (err) {
    const error = new HttpError(msg.STATUS_MESSAGE.UpdateFaild, codes.STATUS_CODE.InternalServerError);
    return next(error);
  }

  user.firstName = firstName;
  user.lastName = lastName;
  user.username = username;
  user.password = password;
  user.dateOfBirth = dateOfBirth;
  user.email = email;
  user.country = country;
  user.state = state;
  user.phoneNumber = phoneNumber;
  user.mobileNumber = mobileNumber;
  
  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(msg.STATUS_MESSAGE.UpdateFaild, codes.STATUS_CODE.InternalServerError);
    return next(error);
  }
  res.status(codes.STATUS_CODE.Success).json({ user, msg:msg.STATUS_MESSAGE.Scc_update});
}

exports.createUser = createUser;
exports.getUsers = getUsers;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;