const express = require('express');
const bodyParser = require('body-parser');
const appointmentsRouter = require('./src/controllers/appointments');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/appointments', appointmentsRouter);

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});