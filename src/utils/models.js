const pool = require('./db');

class Appointment {
  async save(dateTime, userId) {
    try {
      const id = generateRandomKey().toString();
      const query = 'INSERT INTO appointments (id, dateTime, userId) VALUES ($1, $2, $3)';
      const values = [id, dateTime, userId];
      await pool.query(query, values);
      return id;
    } catch (err) {
      console.error('Error al guardar la cita:', err);
      throw new Error('Error al guardar la cita');
    }
  }
}

module.exports = { Appointment };
