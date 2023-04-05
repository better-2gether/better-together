import express from 'express';
import orgController from '../controllers/orgController.js';

const router = express.Router();

router.post(
  '/signup',
  orgController.signUp,
  orgController.getUserRanks,
  (req, res) => {
    res.status(200).json(res.locals.org);
  }
);

router.post(
  '/login',
  orgController.login,
  orgController.getUserRanks,
  (req, res) => {
    const org = res.locals.org;
    res.status(200).json({ org, isUser: false });
  }
);

router.patch(
  '/updateOrg',
  orgController.updateOrg,
  orgController.getUserRanks,
  (req, res) => {
    res.status(200).json(res.locals.org);
  }
);

router.post(
  '/createEvent',
  orgController.createEvent,
  orgController.getUserRanks,
  (req, res) => {
    res.status(200).json(res.locals.org);
  }
);

router.patch(
  '/editEvent',
  orgController.editEvent,
  orgController.getUserRanks,
  (req, res) => {
    res.status(200).json(res.locals.org);
  }
);

router.delete('/deleteEvent', orgController.deleteEvent, (req, res) => {
  res.status(200).json('Event Deleted');
});

router.delete('/deleteOrg', orgController.deleteOrg, (req, res) => {
  res.status(200).json('Org Deleted');
});

export default router;
