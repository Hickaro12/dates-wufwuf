// Función para generar una clave aleatoria de 6 dígitos
exports.generateRandomKey = () => {
    return Math.floor(100000 + Math.random() * 900000);
};
