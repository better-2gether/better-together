/* eslint-disable */
import { UserModel } from '../models/UserModel.js';
import { OrgModel } from '../models/OrgModel.js';
import { getUserEventRanks } from '../models/matchingAlgorithm.js';

import bcrypt from 'bcryptjs';

const userController: Record<string, any> = {};

// signup
// handle auth here
userController.signUp = async (req, res, next) => {
  try {
    const newUser = new UserModel({
      ...req.body,
    });
    const savedNewUser = await newUser.save();
    res.locals.user = savedNewUser;
    return next();
  } catch (error) {
    return next(error);
  }
};

// login
// handle auth here
userController.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    bcrypt.compare(password, user?.password, (error, isMatch) => {
      if (error) {
        return next(error);
      } else if (!isMatch) {
        res.status(401).json('Login failed');
      } else {
        res.locals.user = user;
      }
      return next();
    });
  } catch (error) {
    return next(error);
  }
};

// update preferences
userController.updateUser = async (req, res, next) => {
  try {
    const { _id: userID, ...updatedUser } = req.body;
    const result = await UserModel.updateOne({ _id: userID }, updatedUser);
    const user = await UserModel.findById(userID);
    res.locals.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
};

// delete user
userController.deleteUser = async (req, res, next) => {
  try {
    const { _id: userID } = req.body;
    const result = await UserModel.deleteOne({ _id: userID });
    return next();
  } catch (error) {
    return next(error);
  }
};

userController.getEventRanks = async (req, res, next) => {
  try {
    // need to get all orgs
    const orgs = await OrgModel.find().populate({
      path: 'events',
      model: 'Event',
    });
    // pass user and orgs through ranking algorithm
    const eventRanks = getUserEventRanks(res.locals.user, orgs);
    res.locals.eventRanks = eventRanks;
    return next();
  } catch (error) {
    return next(error);
  }
};

export default userController;
