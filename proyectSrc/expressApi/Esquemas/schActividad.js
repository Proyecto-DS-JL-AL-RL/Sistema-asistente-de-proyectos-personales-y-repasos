var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Actividad = new Schema({
    UserSub : String,
    Titulo : String,
    Descripcion : String,
    Blocked : Boolean,
    Peso : Number,
    ProyectoAsociado : { type : Schema.Types.ObjectId ,ref : 'Proyecto'}
})

module.exports = mongoose.model('Actividad', Actividad);