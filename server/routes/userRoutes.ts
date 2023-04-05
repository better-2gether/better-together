import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

//signup
router.post('/signup', userController.signUp, (req, res) => {
  res.status(200).json(res.locals.user);
});

//signin
router.post('/login', userController.login, (req, res) => {
  res.status(200).json(res.locals.user);
});

//update user preferences (probably combine skill and pref into one)
router.put('/updateUser', userController.updateUser, (req, res) => {});

// delete user
router.delete('/deleteUser', userController.deleteUser, (req, res) => {});

export default router;
