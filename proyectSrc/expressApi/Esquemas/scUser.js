var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var User = new Schema({
    userSub : String,
    NombreUsuario : String,
    Nombre: String,
    Apellido: String,
    Correo: String
})

module.exports = mongoose.model('User', User);