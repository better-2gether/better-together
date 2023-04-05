import express from 'express';
import orgController from '../controllers/orgController.js';

const router = express.Router();

router.post('/signup', orgController.signUp, (req, res) => {});

router.post('/login', orgController.login, (req, res) => {});

router.post('/addEvent', orgController.addEvent, (req, res) => {});

router.put('/updateCauses', orgController.updateOrg, (req, res) => {});

export default router;
