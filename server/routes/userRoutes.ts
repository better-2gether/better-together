import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router()

//update user preferences (probably combine skill and pref into one)
router.put('/updatePref', userController.updatePreferences, (req, res) => {
});

//update user skills
router.put('/updateSkills', userController.updateskills, (req, res) => {

});

//signup
router.post('/signup', userController.signUp, (req, res) => {
    
});

//signin
router.post('/login', userController.login, (req, res) => {

});

export default router;