var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var User = new Schema({
    Nombre: String,
    Apellido: String,
    Correo: String,
    Contrasena: String
})

module.exports = mongoose.model('User', User);