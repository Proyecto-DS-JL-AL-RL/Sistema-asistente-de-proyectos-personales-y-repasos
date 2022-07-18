var Actividad = require('../Esquemas/schActividad');
var UserQueue = require('../Esquemas/schUserQueue');



var createActivity = async function(act){
    let puntos = 100;
    puntos+= act.Blocked?200:0;
    puntos+= act.Peso? (7-act.Peso)*20:0;
    let newActividad = {...act, Puntos:puntos}

    const actividad_ = new Actividad(newActividad)
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
    //console.log(queue.Actividades);
    if (!queue.Actividades)
        return 0;
    let pesos = [];
    let pesoMax = 0;
    for (let i = 0;i<queue.Actividades.length;i++){
        pesos.push(queue.Actividades[i].Peso);
        pesoMax+=queue.Actividades[i].Peso;
    }
    //console.log(pesos);
    let rand = Math.floor(Math.random()*pesoMax);
    let sum = 0;
    let index = 0 ;
    for (let i = 0;i<pesos.length;i++){
        sum+=pesos[i];
        if (sum > rand){
            index = i;
            break;
        }
    }
    let actividadResponse = queue.Actividades[index];

    return actividadResponse;
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

module.exports.createActivity = createActivity;
module.exports.getActivityFromQueue = getActivityFromQueue;
module.exports.getActivityID = getActivityID;
module.exports.getActivitiesFromUser = getActivitiesFromUser;


