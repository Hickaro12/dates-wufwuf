const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3001;

const pool = new Pool({
  user: 'wufwuf',
  host: 'localhost',
  database: 'dates-wufwuf',
  password: 'eggshell123',
  port: 5656,
});

pool.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión establecida con la base de datos PostgreSQL');
});

app.use(express.json());

const { Appointment } = require('./src/utils/models');

app.post('/api/appointments/schedule', async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`);
});

module.exports = app;

