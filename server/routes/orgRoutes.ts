import express from 'express';
import orgController from '../controllers/orgController.js';

const router = express.Router();

router.post('/signup', orgController.signUp, (req, res) => {
  res.status(200).json(res.locals.org);
});

router.post('/login', orgController.login, (req, res) => {
  res.status(200).json(res.locals.org);
});

router.patch('/updateOrg', orgController.updateOrg, (req, res) => {
  res.status(200).json(res.locals.org);
});

router.post('/createEvent', orgController.createEvent, (req, res) => {
  res.status(200).json(res.locals.org);
});

router.patch('/editEvent', orgController.editEvent, (req, res) => {
  res.status(200).json(res.locals.org);
});

export default router;
