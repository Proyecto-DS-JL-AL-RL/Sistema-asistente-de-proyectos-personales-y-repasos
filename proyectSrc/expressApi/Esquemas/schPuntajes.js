var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Puntaje = new Schema({
    UserSub : String,
    ProyectoId : {type : Schema.Types.ObjectId, ref : 'Proyecto'},
    Puntos : Number,
    ConstanciaDiff : Number,
    LogrosDiff : Number
})

module.exports = mongoose.model('Puntaje', Puntaje);