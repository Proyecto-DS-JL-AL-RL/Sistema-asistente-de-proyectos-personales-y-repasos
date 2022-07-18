var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Puntaje = new Schema({
    UserSub : String,
    Puntos : Number,
    ConstanciaDiff : Number,
    LogrosDiff : Number
})

module.exports = mongoose.model('Puntaje', Puntaje);