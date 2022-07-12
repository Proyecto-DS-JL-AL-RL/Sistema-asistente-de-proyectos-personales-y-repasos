var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Tarjeta = new Schema({
    Pregunta: String,
    Opciones: [String],
    Respuesta: Number
})

module.exports = mongoose.model('Tarjeta', Tarjeta);