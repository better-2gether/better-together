import express from "express";
import orgController from "../controllers/orgController.js";

const router = express.Router()

router.post('/addEvent', orgController.addEvent, (req, res) => {

});

router.put('/updateCauses', orgController.updateCauses, (req, res) => {

});

router.put('/editEvent', orgController.editEvent, (req, res) => {

});

router.delete('/deleteEvent', orgController.deleteEvent, (req, res) => {

});

export default router;