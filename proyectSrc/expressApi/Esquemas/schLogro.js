var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Logro = new Schema({
    Titulo: String,
    Descripcion: String,
    ProyectId : {type: Schema.Types.ObjectId,ref : 'Proyecto'},
    Tipo : String,
    UrlRef : String,
    Puntos : Number,
    Fecha : Date
})

module.exports = mongoose.model('Logro', Logro);