const { generateRandomKey } = require('../utils');

const pool = require('./db');

class Appointment {
  async save(dateTime, day, hour, userId, reason = null) {
    try {
      const id = generateRandomKey().toString();
      const query = 'INSERT INTO appointments (id, dateTime, day, hour, userId, reason) VALUES ($1, $2, $3, $4, $5, $6)';
      const values = [id, dateTime, day, hour, userId, reason];
      await pool.query(query, values);
      return id;
    } catch (err) {
      console.error('Error al guardar la cita:', err);
      throw new Error('Error al guardar la cita');
    }
  }
}

module.exports = { Appointment };
