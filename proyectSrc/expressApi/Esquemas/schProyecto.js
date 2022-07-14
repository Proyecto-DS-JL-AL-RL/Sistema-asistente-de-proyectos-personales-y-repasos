var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Proyecto = new Schema({
    UserSub : String,
    Objetivos : [String],
    Puntajes : {type: Schema.Types.ObjectId , ref: 'Puntaje'},
    Logros : [{type: Schema.Types.ObjectId, ref : 'Logro'}],
    Progreso : Number
})

module.exports = mongoose.model('Proyecto', Proyecto);