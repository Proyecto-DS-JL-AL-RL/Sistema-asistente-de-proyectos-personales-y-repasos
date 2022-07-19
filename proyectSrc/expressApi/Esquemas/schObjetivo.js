var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Objetivo = new Schema({
    UserSub : String,
    Titulo : String,
    Descripcion : String,
    Peso : Number,
    ProyectoAsociado : { type : Schema.Types.ObjectId ,ref : 'Proyecto'},
    Puntos:Number,
    Fecha: Date
})

module.exports = mongoose.model('Objetivo', Objetivo);