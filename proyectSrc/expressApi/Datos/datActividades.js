var Actividad = require('../Esquemas/schActividad');
var UserQueue = require('../Esquemas/schUserQueue');


var initUserQueue = async function(userSub){
    const newQueue = UserQueue({UserSub:userSub, Actividades:[]})
    await newQueue.save().catch(err=> console.log(err))
}

var createActivity = async function(act){
    const actividad_ = new Actividad(act)
    const savedAct = await actividad_.save().catch(err=> console.log(err))
    const response = UserQueue.findOneAndUpdate(
        { "UserSub" : savedAct.UserSub },
        { "$push": { "Actividades": savedAct._id }}
    )
    return response;
}

var getActivitiesFromUser = async function (userSub){
    let queue = await UserQueue.findOne({UserSub:userSub}).populate('Actividades').exec().catch(err=> console.log(err));
    return queue.Actividades;
    //return response;
}

var getActivityFromQueue = async function (userSub){
    let queue = await UserQueue.findOne({UserSub:userSub}).populate('Actividades').exec().catch(err=> console.log(err));
    console.log(queue);
    //return response;
}

var getActivityID = async function (id){
    var response = await Actividad.findById(id).catch(err=> console.log(err));
    return response;
}

var updateCard = async function(id, update){
    const updateCard = await Tarjeta.updateOne({_id:id}, update).catch(
        err=> console.log(err))
    return updateCard
}


var deleteCard = async function(id){
    await Tarjeta.findByIdAndDelete(id)
 }

module.exports.initUserQueue = initUserQueue;
module.exports.createActivity = createActivity;
module.exports.getActivityFromQueue = getActivityFromQueue;
module.exports.getActivityID = getActivityID;
module.exports.getActivitiesFromUser = getActivitiesFromUser;


