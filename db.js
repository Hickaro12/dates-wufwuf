const express = require('express');
const mysql = require('mysql');
const { generateRandomKey } = require('./utils'); 

const app = express();
const PORT = process.env.PORT || 3001;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'tu_usuario',
    password: 'tu_contraseña',
    database: 'nombre_de_tu_base_de_datos'
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión establecida con la base de datos MySQL');
});


app.post('/api/appointments/schedule', (req, res) => {
    const { dateTime, userId } = req.body;

    const id = generateRandomKey().toString();

    const sql = 'INSERT INTO appointments (id, dateTime, userId) VALUES (?, ?, ?)';
    db.query(sql, [id, dateTime, userId], (err, result) => {
        if (err) {
            console.error('Error al programar la cita:', err);
            res.status(500).json({ error: 'Error al programar la cita' });
        } else {
            console.log('Cita programada exitosamente');
            res.status(200).json({ message: 'Cita programada exitosamente' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`);
});

