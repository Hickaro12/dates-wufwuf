const express = require('express');
const router = express.Router();
const { Appointment } = require('./src/utils/models');

router.post('/schedule', async (req, res) => {
    try {
        const { dateTime, userId } = req.body;
        const id = await Appointment.save(dateTime, userId);
        res.status(201).json({ message: 'Cita programada exitosamente', id });
    } catch (err) {
        console.error('Error al programar la cita:', err);
        res.status(500).json({ error: 'Error al programar la cita' });
    }
});
//teórica conexión con la base de datos de user management
router.get('/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const appointments = await Appointment.findByUserId(userId);
        res.status(200).json(appointments);
    } catch (err) {
        console.error('Error al obtener las citas del usuario:', err);
        res.status(500).json({ error: 'Error al obtener las citas del usuario' });
    }
});

module.exports = router;
