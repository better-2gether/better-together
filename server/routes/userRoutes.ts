import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

//signup
router.post(
  '/signup',
  userController.signUp,
  userController.getEventRanks,
  (req, res) => {
    const user = res.locals.user;
    user.eventRanks = res.locals.eventRanks;
    res.status(200).json({ user, eventRanks: res.locals.eventRanks });
  }
);

//signin
router.post(
  '/login',
  userController.login,
  userController.getEventRanks,
  (req, res) => {
    const user = res.locals.user;
    user.eventRanks = res.locals.eventRanks;
    res
      .status(200)
      .json({ user, eventRanks: res.locals.eventRanks, isUser: true });
  }
);

//update user preferences (probably combine skill and pref into one)
router.patch(
  '/updateUser',
  userController.updateUser,
  userController.getEventRanks,
  (req, res) => {
    const user = res.locals.user;
    user.eventRanks = res.locals.eventRanks;
    res.status(200).json({ user, eventRanks: res.locals.eventRanks });
  }
);

// delete user
router.delete('/deleteUser', userController.deleteUser, (req, res) => {
  res.status(200).json('User Deleted');
});

export default router;
