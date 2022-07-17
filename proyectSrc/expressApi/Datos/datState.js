var Actividad = require('../Esquemas/schActividad');
var UserQueue = require('../Esquemas/schUserQueue');
var State = require('../Esquemas/schState');

var initUserState = async function(userSub){
    const newState = State({UserSub:userSub, ActividadActual:null})
    await newState.save().catch(err=> console.log(err))
}

var setActivityState = async function(stateVar){
    const {userSub,activity} = stateVar;
    const response = State.findOneAndUpdate(
        { "UserSub" : userSub },
        { "ActividadActual" : activity}
    )
    return response;
}

var endActivity = async function(body){
    const {activity,evidenceRef} = body;
    console.log('ref',evidenceRef);
    const {UserSub,Puntos} = activity;
    const response = State.findOneAndUpdate(
        { "UserSub" : UserSub },
        { "ActividadActual" : null}
    )

    //Puntos
        //Puntos
    //Evidencia
        //Logro
    
    return response;
}


var getState = async function (userSub){
    const state = await State.findOne({UserSub:userSub}).catch(err=> console.log(err));
    return state;
}


module.exports.initUserState = initUserState;
module.exports.setActivityState = setActivityState;
module.exports.getState = getState;
module.exports.endActivity = endActivity;



