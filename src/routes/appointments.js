const express = require('express');
const router = express.Router();
const { scheduleAppointment } = require('../controllers/appController');

router.post('/schedule', scheduleAppointment);

module.exports = router;
