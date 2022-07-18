var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserQueue = new Schema({
    UserSub: String,
    Actividades: [{type : Schema.Types.ObjectId, ref : 'Actividad'}],
    Proyectos :  [{type : Schema.Types.ObjectId, ref : 'Proyecto'}]
})

module.exports = mongoose.model('UserItems', UserQueue);