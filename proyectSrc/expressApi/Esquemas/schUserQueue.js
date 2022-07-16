var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserQueue = new Schema({
    UserSub: String,
    Actividades: [{type : Schema.Types.ObjectId, ref : 'Actividad'}],
})

module.exports = mongoose.model('UserQueue', UserQueue);