var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var State = new Schema({
    UserSub : String,
    ActividadActual : {type: Schema.Types.ObjectId , ref: 'Actividad'}
})

module.exports = mongoose.model('State', State);