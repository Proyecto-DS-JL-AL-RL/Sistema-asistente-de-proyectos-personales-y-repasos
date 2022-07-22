var Proyecto = require('../Esquemas/schProyecto');
var Puntaje = require('../Esquemas/schPuntajes');
var Logro = require('../Esquemas/schLogro');
var State = require('../Esquemas/schState');
var UserItems = require('../Esquemas/schUserQueue');
let datProyectos = require('./datProyectos');
var User = require('../Esquemas/scUser');

var initUserState = async function(userSub,userNickname){
    let checkItems = await UserItems.findOne({UserSub:userSub}).catch(err=>console.log(err));
    if (!checkItems){
        const newItems = UserItems({UserSub:userSub, Actividades:[], Proyectos: []})
        checkItems = await newItems.save().catch(err=> console.log(err))
    }

    const checkState = await State.findOne({UserSub:userSub}).catch(err=>console.log(err));

    if (checkState){
        if (!checkState.BaseProyect){
            const p_id = await createBaseProyect(userSub,userNickname);
            checkState.BaseProyect = p_id;
            checkItems.Proyectos?.push(p_id);
            await checkItems.save().catch(err=>console.log(err));
        }
    }else{
        const p_id = await createBaseProyect(userSub,userNickname);
        const newState = State({UserSub:userSub, ActividadActual:null, BaseProyect:p_id})
        await newState.save().catch(err=> console.log(err));       
        checkItems.Proyectos?.push(p_id);
        await checkItems.save().catch(err=>console.log(err));
    }    
}

var createBaseProyect = async (userSub,userNickname)=>{
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
    await savedP.save().catch(err=>console.log(err));
    return savedP._id;
};

var setActivityState = async function(stateVar){
    const {userSub,activity} = stateVar;
    const response = State.findOneAndUpdate(
        { "UserSub" : userSub },
        { "ActividadActual" : activity}
    )
    return response;
}

var endActivity = async function(body){
    const {activity,evidenceBody} = body;
    //console.log('ref',evidenceBody);
    //console.log('\nActivity',activity);
    const {UserSub,Puntos,ProyectoAsociado,Titulo} = activity;
    const {tipo,UrlRef,RefTitle} = evidenceBody;
    const hoy = new Date();
    const parsedDate = [String(hoy.getMonth()),String(hoy.getDate()),String(hoy.getFullYear())].join('/');
    const descripcion = "Completada actividad: "+Titulo+" de la Cola de Actividades en 'Dame algo que hacer' - "+parsedDate;

    const newLogro = new Logro({
        Titulo: "Completada Actividad: "+Titulo,
        Descripcion: descripcion,
        ProyectId : ProyectoAsociado,
        Tipo : tipo,
        UrlRef : UrlRef,
        RefTitle: RefTitle,
        Puntos : Puntos,
        Fecha : hoy
    });

    //console.log(newLogro);
    const savedLogro = await newLogro.save().catch(err=>console.log(err));

    datProyectos.sumarPuntos(ProyectoAsociado,Puntos,true);

    const proyect_ = Proyecto.findOneAndUpdate(
        { "_id" : ProyectoAsociado },
        { "$push": { "Logros": savedLogro._id }}).catch(err=>console.log(err));

    const response = await State.findOneAndUpdate(
        { "UserSub" : UserSub },
        { "ActividadActual" : null}
    ).catch(err=>console.log(err));   
    return response;
}


var getState = async function (userSub,userNickname){
    console.log('flag1',userSub)
    if (userSub){
        await checkConsistency(userSub,userNickname);
        const state = await State.findOne({UserSub:userSub}).catch(err=> console.log(err));
        return state;
    }else   
        return "Null_UserSub"   
}

var agregarPuntos = async function (body){
    const {proyecto,Puntos} = body;
    console.log(proyecto,'-',Puntos);
    const response = await datProyectos.sumarPuntos(proyecto,Puntos,false);
    return response
}

var checkConsistency = async function (UserSub,userNick){
    let userF = await State.findOne({UserSub:UserSub}).catch(err=>console.log(err));
    console.log("CHECKING CONSISTENCY = ",userF);
    if (userF){
        return null;
    }else{
        console.log('asd');
        let resp = await initUserState(UserSub,userNick);        
        return resp;
    }
}

module.exports.initUserState = initUserState;
module.exports.setActivityState = setActivityState;
module.exports.getState = getState;
module.exports.endActivity = endActivity;
module.exports.agregarPuntos = agregarPuntos;
module.exports.checkConsistency = checkConsistency;


