var Proyecto = require('../Esquemas/schProyecto');
var UserItems =require('../Esquemas/schUserQueue');
var Puntaje = require('../Esquemas/schPuntajes');
var ObjetivosMong = require('../Esquemas/schObjetivo');
var Logros_ = require('../Esquemas/schLogro');

var createProyect = async function(body){
    const puntajeBase = new Puntaje({ UserSub:userSub ,Puntos : 50, ConstanciaDiff : 0, LogrosDiff : 0})
    const savedScore = await puntajeBase.save().catch(err=>console.log(err));

    let newProyecto = {...body,Puntajes:savedScore._id};    
    const proyecto_ = new Proyecto(newProyecto)
    const savedP = await proyecto_.save().catch(err=> console.log(err))
    const response = UserItems.findOneAndUpdate(
        { "UserSub" : savedP.UserSub },
        { "$push": { "Proyectos": savedP._id }}
    )

    const LogroBienvenida = new Logro({
        Titulo: "Empezó :"+savedP.Titulo,
        Descripcion: "Empezó un nuevo Proyecto",
        ProyectId : savedP._id,
        Tipo : null,
        UrlRef : null,
        Puntos : 50,
        Fecha : new Date()
    })    
    const savedLogro = await LogroBienvenida.save().catch(err=>console.log(err));
    savedP.Logros.push(savedLogro._id);
    //console.log('savedP:' , savedP);
    savedP.save().catch(err=>console.log(err));
    return savedP;
}

var getProyectById = async function(id){
    let response = await Proyecto.findById(id).populate(['Puntajes','Logros','Objetivos']).exec().catch(err=> console.log(err));
    const hoy = new Date();
    const hoyDias = Math.round(hoy.getTime()/(1000*60*6024))
    const sorted = response.Objetivos.sort((o1,o2)=>{
        const o1Dias = Math.round(o1.Fecha.getTime()/(1000*60*6024));
        const o2Dias = Math.round(o2.Fecha.getTime()/(1000*60*6024));
        const dif1 = hoy - o1Dias;
        const dif2 = hoy - o2Dias;
        if (dif1 + o1.Peso > dif2 + o2.Peso){
            return 1;
        }else if(dif1 + o1.Peso < dif2 + o2.Peso){
            return -1;
        }
        return 0;
    });
    response.Objetivos = sorted;
    //console.log(response);
    return response;
}


var sumarPuntos = async function (projectID,Puntos,actividad = false){
    const proyect = await Proyecto.findById(projectID).catch(err=> console.log(err));
    const {Puntajes} = proyect;
    const puntos_ = await Puntaje.findById(Puntajes).catch(err=>console.log(err));
    puntos_.Puntos+= Puntos;

    if (actividad){
        const hoy = new Date();
        const ultimo = proyect.UltimaActividad;
        const diasDiff = Math.round(hoy.getTime()/(1000*60*6024)) - Math.round(ultimo.getTime()/(1000*60*6024));
        if (diasDiff > 0){
            proyect.UltimaActividad = hoy;
            proyect.ActividadSemanal.shift();
            proyect.ActividadSemanal.push(1);            
            puntos_.ConstanciaDiff = proyect.ActividadSemanal.reduce((a,b)=>a+b) / 7;                 
        }    
        puntos_.LogrosDiff+=1;      
        proyect.save().catch(err=>console.log(err));
    }    
    puntos_.save().catch(err=>console.log(err));
}

var actualizarConstanciaZero = async function(projectID){
    const proyect = await Proyecto.findById(projectID).catch(err=> console.log(err));
    const hoy = new Date();
    const ultimo = proyect.UltimaActividad;
    //console.log(ultimo);
    //console.log(hoy);
    const diasDiff = Math.round(hoy.getTime()/(1000*60*60*24)) - Math.round(ultimo.getTime()/(1000*60*60*24));
    //console.log(proyect.Titulo,'-',diasDiff,'-',proyect.ActividadSemanal);
    if (diasDiff > 0){
        let zeros = 0;
        for (let i = 0;i<7;i++){
            if (proyect.ActividadSemanal[6-i]==1){
                break;
            }
            zeros+=1;
        }
        let tozeros = diasDiff - zeros;
        for (let i = 0;i<tozeros;i++){
            proyect.ActividadSemanal.shift();
            proyect.ActividadSemanal.push(0);
        }      
        const {Puntajes} = proyect;
        const puntos_ = await Puntaje.findById(Puntajes).catch(err=>console.log(err));              
        puntos_.ConstanciaDiff = proyect.ActividadSemanal.reduce((a,b)=>a+b) / 7;      
        puntos_.save();
        proyect.save();
    }
};


var getProyectListFromUser = async function(UserSub){
    let userItems = await UserItems.findOne({UserSub:UserSub}).exec().catch(err=> console.log(err));
    userItems.Proyectos?.forEach(async p=>await actualizarConstanciaZero(p));
    //console.log('userSub'+UserSub);
    let queue = await UserItems.findOne({UserSub:UserSub}).populate('Proyectos').exec().catch(err=> console.log(err));
    return queue.Proyectos;    
}

var addObjetivo = async function(body){
    const {objetivo,proyectId} = body;
    const objetivo_ = new ObjetivosMong(objetivo);
    const savedObj = await objetivo_.save().catch(err=>console.log(err))
    const response = Proyecto.findOneAndUpdate(
        {"_id":proyectId},
        {"$push": { "Objetivos": savedObj._id }});
    return response;
}

var completeObjetivo = async function(body){

}

module.exports.createProyect = createProyect;
module.exports.getProyectById = getProyectById;
module.exports.getProyectListFromUser = getProyectListFromUser;
module.exports.addObjetivo = addObjetivo;
module.exports.completeObjetivo = completeObjetivo;
