var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Proyecto = new Schema({
    UserSub : String,
    Titulo : String,
    Objetivos : [{Titulo : String , Descripcion : String}],
    Puntajes : {type: Schema.Types.ObjectId , ref: 'Puntaje'},
    Logros : [{type: Schema.Types.ObjectId, ref : 'Logro'}],
    Progreso : Number,
    UltimaActividad : Date,
    ActividadSemanal: [Number]
});

module.exports = mongoose.model('Proyecto', Proyecto);