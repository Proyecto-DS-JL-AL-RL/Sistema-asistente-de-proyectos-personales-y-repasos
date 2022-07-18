var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Mazos = new Schema({
    userSub:String,
    Titulo: String,
    Descripcion: String,
    Tarjetas:[{
            Pregunta: String,
            Opciones: [String],
            Respuesta: Number
    }]
})

module.exports = mongoose.model('Mazos', Mazos);