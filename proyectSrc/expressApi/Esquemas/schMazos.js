var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Mazos = new Schema({
    UserID:String,
    Titulo: String,
    Descripcion: String,
    Tarjetas:[{
            Pregunta: String,
            Opciones: [String],
            Respuesta: Number
    }]
})

module.exports = mongoose.model('Mazos', Mazos);