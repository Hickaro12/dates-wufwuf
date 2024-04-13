const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const appointmentsRoutes = require('./routes/appointments');


app.use(express.json());
app.use('/api/appointments', appointmentsRoutes);

app.listen(PORT, () => {
    console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`);
});

