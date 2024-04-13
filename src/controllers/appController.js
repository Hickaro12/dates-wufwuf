const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');

function generateRandomId() {
    return Math.floor(100000 + Math.random() * 900000);
}

router.post('/schedule', async (req, res) => {
    try {
        const appointmentId = req.body.userId ? req.body.userId : generateRandomId();

        const appointment = new Appointment({
            id: appointmentId,
            dateTime: req.body.dateTime,
            userId: req.body.userId
        });

        await appointment.save();

        res.status(201).send('Cita programada exitosamente');
    } catch (err) {
        console.error('Error al programar la cita:', err);
        res.status(500).send('Error al programar la cita');
    }
});

router.get('/user/:userId', async (req, res) => {
    try {
        const appointments = await Appointment.find({ userId: req.params.userId });
        res.status(200).json(appointments);
    } catch (err) {
        console.error('Error al obtener las citas del usuario:', err);
        res.status(500).send('Error al obtener las citas del usuario');
    }
});

module.exports = router;