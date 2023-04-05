/* eslint-disable */
import { OrgModel } from '../models/OrgModel.js';
import { EventModel } from '../models/EventModel.js';
import { UserModel } from '../models/UserModel.js';
import { getOrgUserRanks } from '../models/matchingAlgorithm.js';
import bcrypt from 'bcryptjs';

const orgController: Record<string, any> = {};

// signup
// handle auth here
orgController.signUp = async (req, res, next) => {
  try {
    const newOrg = new OrgModel({
      ...req.body,
    });
    const savedNewOrg = await newOrg.save();
    res.locals.org = savedNewOrg;
    return next();
  } catch (error) {
    return next(error);
  }
};

// login
// handle auth here
orgController.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const org = await OrgModel.findOne({ username }).populate('events');
    bcrypt.compare(password, org?.password, (error, isMatch) => {
      if (error) {
        return next(error);
      } else if (!isMatch) {
        res.status(401).json('Login failed');
      } else {
        res.locals.org = org;
      }
      return next();
    });
  } catch (error) {
    return next(error);
  }
};

// handles updating causes
orgController.updateOrg = async (req, res, next) => {
  try {
    const { _id: orgID, ...updatedOrg } = req.body;
    const result = await OrgModel.updateOne({ _id: orgID }, updatedOrg);
    const org = await OrgModel.findById(orgID);
    res.locals.org = org;
    return next();
  } catch (error) {
    return next(error);
  }
};

// add event
orgController.createEvent = async (req, res, next) => {
  try {
    const { _id: orgID, ...event } = req.body;
    const newEvent = new EventModel({ ...event });

    const savedNewEvent = await newEvent.save();
    const updatedOrg = await OrgModel.findOneAndUpdate(
      { _id: orgID },
      { $push: { events: savedNewEvent._id } },
      { new: true }
    ).populate('events');

    res.locals.event = savedNewEvent;
    res.locals.org = updatedOrg;

    return next();
  } catch (error) {
    return next(error);
  }
};

// edit event
orgController.editEvent = async (req, res, next) => {
  try {
    const { orgID, eventID, ...updates } = req.body;

    const updatedEvent = await EventModel.findOneAndUpdate(
      { _id: eventID },
      { $set: updates },
      { new: true }
    );

    await OrgModel.findOneAndUpdate(
      { _id: orgID, events: { $elemMatch: { _id: eventID } } },
      { $set: { 'events.$': updatedEvent } }
    );
    const org = await OrgModel.findOne({ _id: orgID }).populate('events');

    res.locals.org = org;
    return next();
  } catch (error) {
    return next(error);
  }
};

// delete event
orgController.deleteEvent = async (req, res, next) => {
  try {
    const { _id: eventID } = req.body;
    const result = await EventModel.deleteOne({ _id: eventID });
    return next();
  } catch (error) {
    return next(error);
  }
};

// delete org
orgController.deleteOrg = async (req, res, next) => {
  try {
    const { _id: orgID } = req.body;
    const result = await OrgModel.deleteOne({ _id: orgID });
    return next();
  } catch (error) {
    return next(error);
  }
};

orgController.getUserRanks = async (req, res, next) => {
  try {
    // get all users
    const users = await UserModel.find();
    getOrgUserRanks(res.locals.org, users);
    return next();
  } catch (error) {
    return next(error);
  }
};

export default orgController;
