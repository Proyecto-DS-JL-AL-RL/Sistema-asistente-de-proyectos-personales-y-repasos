var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var State = new Schema({
    UserSub : String,
    ActividadActual : {type: Schema.Types.ObjectId , ref: 'Actividad'},
    BaseProyect : {type: Schema.Types.ObjectId, ref: 'Proyecto'}
})

module.exports = mongoose.model('State', State);