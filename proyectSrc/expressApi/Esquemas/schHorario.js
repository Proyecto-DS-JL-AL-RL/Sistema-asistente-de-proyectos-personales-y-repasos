const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const configHorario = new Schema({
    userSub: String,
    intervaloDefault : {type: Boolean, default:false},
    tema: {type: Number, default:0},
    sobrescribir: {type:Boolean, default:true},
    intervalo:{type:Array,default:[6,18]}
})

const horario = new Schema({
    userSub: String,
    horario: [],
    config:{type: Schema.Types.ObjectId,ref:'ConfigHorario'}
})
const ConfigHorario = mongoose.model('ConfigHorario',configHorario);
const Horario = mongoose.model('Horario',horario);

module.exports = {Horario,ConfigHorario};
