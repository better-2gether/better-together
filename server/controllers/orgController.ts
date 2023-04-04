import { Request, Response, NextFunction } from 'express';

export const orgController: Record<string, any> = {};

// login
// handle auth here
orgController.login = async (req, res, next) => {};

// signup
// handle auth here
orgController.singUp = async (req, res, next) => {};

// update causes
orgController.updateCauses = async (req, res, next) => {};

// add event
orgController.addEvent = async (req, res, next) => {};

// edit event
orgController.editEvent = async (req, res, next) => {};

// delete event
orgController.deleteEvent = async (req, res, next) => {};

// delete org
orgController.deleteOrg = async (req, res, next) => {};
