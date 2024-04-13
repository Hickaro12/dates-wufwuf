const express = require('express');
const router = express.Router();
const { generateRandomKey } = require('../../utils');
const { scheduleAppointment } = require('../controllers/appointments');

let appointments = []; 

router.get('/', (req, res) => {
  res.json(appointments);
});


router.post('/', (req, res) => {
  const { date, time, token } = req.body;

  let id = '';
  if (token) {
    id = token;
  } else {
    id = generateRandomKey().toString();
  }

  const newAppointment = {
    id,
    date,
    time,
  };

  appointments.push(newAppointment);

  res.status(201).json(newAppointment);
});

// Obtener una cita por su ID
router.get('/:id', (req, res) => {
  const appointment = appointments.find(appt => appt.id === req.params.id);
  if (!appointment) {
    res.status(404).json({ error: 'Cita no encontrada' });
  } else {
    res.json(appointment);
  }
});

// Actualizar una cita existente
router.put('/:id', (req, res) => {
  const { date, time } = req.body;
  const appointmentIndex = appointments.findIndex(appt => appt.id === req.params.id);
  if (appointmentIndex === -1) {
    res.status(404).json({ error: 'Cita no encontrada' });
  } else {
    appointments[appointmentIndex] = { ...appointments[appointmentIndex], date, time };
    res.json(appointments[appointmentIndex]);
  }
});

// Eliminar una cita
router.delete('/:id', (req, res) => {
  const appointmentIndex = appointments.findIndex(appt => appt.id === req.params.id);
  if (appointmentIndex === -1) {
    res.status(404).json({ error: 'Cita no encontrada' });
  } else {
    appointments.splice(appointmentIndex, 1);
    res.status(204).end();
  }
});

module.exports = router;