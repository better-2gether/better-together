import { Request, Response, NextFunction } from 'express';

const userController: Record<string, any> = {};

// login
// handle auth here
userController.login = async (req, res, next) => {};

// signup
// handle auth here
userController.signUp = async (req, res, next) => {

};

// update preferences
userController.updatePreferences = async (req, res, next) => {};

// update skills
userController.updateskills = async (req, res, next) => {};

// add skill
userController.addskills = async (req, res, next) => {};

// delete user
userController.deleteUser = async (req, res, next) => {};

export default userController;
