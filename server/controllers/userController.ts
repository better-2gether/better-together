import { UserModel } from '../models/UserModel.js';
import bcrypt from 'bcryptjs';

const userController: Record<string, any> = {};

// signup
// handle auth here
userController.signUp = async (req, res, next) => {
  try {
    console.log(req.body);
    const {
      firstName,
      lastName,
      username,
      password,
      skills,
      preferences,
      eventRanks,
    } = req.body;
    const newUser = new UserModel({
      firstName,
      lastName,
      username,
      password,
      skills,
      preferences,
      eventRanks,
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
    console.log('Login req body: ', req.body);
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    console.log(user);
    bcrypt.compare(password, user?.password, (error, isMatch) => {
      if (error) {
        return next(error);
      } else if (!isMatch) {
        res.status(401).json('Login failed');
      } else {
        console.log('login success');
        res.locals.user = user;
      }
      return next();
    });
  } catch (error) {
    return next(error);
  }
};

// update preferences
userController.updateUser = async (req, res, next) => {};

// delete user
userController.deleteUser = async (req, res, next) => {};

export default userController;
