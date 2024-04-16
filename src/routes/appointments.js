
const express = require('express');
const router = express.Router();

const { Appointment } = require('./src/utils/models');

router.post('/schedule', async (req, res) => {
  const { dateTime, userId } = req.body;

  const appointment = new Appointment();
  try {
    const id = await appointment.save(dateTime, userId);
    console.log('Cita programada exitosamente, ¡Te esperamos!');
    res.status(200).json({ message: 'Cita programada exitosamente', id });
  } catch (err) {
    console.error('Error al programar la cita:', err);
    res.status(500).json({ error: 'Error al programar la cita' });
  }
});

module.exports = router;

