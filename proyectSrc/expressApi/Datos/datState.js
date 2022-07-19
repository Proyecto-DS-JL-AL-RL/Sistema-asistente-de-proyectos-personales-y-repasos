var Proyecto = require('../Esquemas/schProyecto');
var Puntaje = require('../Esquemas/schPuntajes');
var Logro = require('../Esquemas/schLogro');
var State = require('../Esquemas/schState');
var UserItems = require('../Esquemas/schUserQueue');

var initUserState = async function(userSub,userNickname){
    const puntajeBase = new Puntaje({ UserSub:userSub ,Puntos : 150, ConstanciaDiff : 0, LogrosDiff : 0})
    const savedScore = await puntajeBase.save().catch(err=>console.log(err));

    const proyectoBase = new Proyecto({
        UserSub : userSub,
        Titulo : userNickname,
        Descripcion: "Proyecto Base",
        Objetivos : [],
        Puntajes : savedScore._id,
        Logros : [],
        Progreso : 0,
        UltimaActividad : new Date(),
        ActividadSemanal: [1,1,1,1,1,1,1]
    })
    const savedP = await proyectoBase.save().catch(err=> console.log(err));

    const newState = State({UserSub:userSub, ActividadActual:null, BaseProyect:savedP._id})
    await newState.save().catch(err=> console.log(err))

    const newItems = UserItems({UserSub:userSub, Actividades:[], Proyectos: [savedP._id]})
    const savedItems = await newItems.save().catch(err=> console.log(err))
    
    const LogroBienvenida = new Logro({
        Titulo: "Empezó a usar nuestra Aplicación",
        Descripcion: "Creo su cuenta y empezó a Organizar sus proyectos",
        ProyectId : savedP._id,
        Tipo : null,
        UrlRef : null,
        Puntos : 150,
        Fecha : new Date()
    })
    
    const savedLogro = await LogroBienvenida.save().catch(err=>console.log(err));
    savedP.Logros.push(savedLogro._id);
    //console.log('savedP:' , savedP);
    savedP.save().catch(err=>console.log(err));
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
        //AgregarPunto(idProyecto);
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



