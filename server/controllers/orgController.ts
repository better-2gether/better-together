import { OrgModel } from '../models/OrgModel.js';
const orgController: Record<string, any> = {};

// login
// handle auth here
orgController.login = async (req, res, next) => {};

// signup
// handle auth here
orgController.signUp = async (req, res, next) => {
  try {
    const { orgName, username, password, causes, events } = req.body;
    const newOrg = new OrgModel({
      orgName,
      username,
      password,
      causes,
      events,
    });
    const savedNewOrg = await newOrg.save();
    res.locals.org = savedNewOrg;
    return next();
  } catch (error) {
    return next(error);
  }
};

// handles updating causes
orgController.updateOrg = async (req, res, next) => {};

// add event
orgController.addEvent = async (req, res, next) => {};

// edit event
orgController.editEvent = async (req, res, next) => {};

// delete event
orgController.deleteEvent = async (req, res, next) => {};

// delete org
orgController.deleteOrg = async (req, res, next) => {};

export default orgController;
