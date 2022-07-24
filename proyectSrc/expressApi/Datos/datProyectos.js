var Proyecto = require('../Esquemas/schProyecto');
var UserItems =require('../Esquemas/schUserQueue');
var Puntaje = require('../Esquemas/schPuntajes');
var ObjetivosMong = require('../Esquemas/schObjetivo');
var Logros_ = require('../Esquemas/schLogro');
var StateUser = require('../Esquemas/schState');
var Actividades_ = require('../Esquemas/schActividad');

var createProyect = async function(bodyBase){
    const body = {...bodyBase,
        Objetivos : [],
        Logros : [],
        Progreso : 0,
        UltimaActividad : new Date(),
        ActividadSemanal: [1,1,1,1,1,1,1]
    }
    const {UserSub} = bodyBase
    const puntajeBase = new Puntaje({ UserSub:UserSub ,Puntos : 50, ConstanciaDiff : 1, LogrosDiff : 1})
    const savedScore = await puntajeBase.save().catch(err=>console.log(err));

    let newProyecto = {...body,Puntajes:savedScore._id};    
    const proyecto_ = new Proyecto(newProyecto)
    const savedP = await proyecto_.save().catch(err=> console.log(err))


    const LogroBienvenida = new Logros_({
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
    const savedP2 = await savedP.save().catch(err=>console.log(err));
    const response = UserItems.findOneAndUpdate(
        { "UserSub" : savedP.UserSub },
        { "$push": { "Proyectos": savedP2._id }}
    )
    if (response)
        return response;
    else
        return({error: 'no_init'});
}

var getProyectById = async function(id){
    let response = await Proyecto.findById(id).populate(['Puntajes','Logros','Objetivos']).exec().catch(err=> console.log(err));
    if (response){
        const hoy = new Date();
        const hoyDias = Math.round(hoy.getTime()/(1000*60*6024))
        const sorted = response.Objetivos.sort((o1,o2)=>{
            const o1Dias = Math.floor(o1.Fecha.getTime()/(1000*60*6024));
            const o2Dias = Math.floor(o2.Fecha.getTime()/(1000*60*6024));
            const dif1 = hoy - o1Dias;
            const dif2 = hoy - o2Dias;
            if (dif1 + o1.Peso > dif2 + o2.Peso){
                return -1;
            }else if(dif1 + o1.Peso < dif2 + o2.Peso){
                return 1;
            }
            return 0;
        });
        response.Objetivos = sorted;        
        let o1 = new Date(response.UltimaActividad);
        let o2 = new Date()
        const o1Dias = Math.floor(o1.getTime()/(1000*60*6024));
        const o2Dias = Math.floor(o2.getTime()/(1000*60*6024));
        const diasDiff = o2Dias-o1Dias;
        if (response.Puntajes){
            response.Puntajes.ConstanciaDiff = diasDiff;
        }
        //console.log(response);
        return response;
    }else{
        return {error: "not_found"}
    }
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
        proyect.UltimaActividad = hoy;
        if (diasDiff > 0){            
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
        await puntos_.save();
        await proyect.save();
    }
};


var getProyectListFromUser = async function(UserSub){
    let userItems = await UserItems.findOne({UserSub:UserSub}).exec().catch(err=> console.log(err));
    if (userItems){
        //userItems?.Proyectos?.forEach(async p=>await actualizarConstanciaZero(p));
        //console.log('userSub'+UserSub);
        let queue = await UserItems.findOne({UserSub:UserSub}).populate('Proyectos').exec().catch(err=> console.log(err));
        return queue.Proyectos||{error:'something-else'};   
    }else{
        return({error: 'no_init'});
    }
}

var addObjetivo = async function(body){
    const {objetivo,proyectId} = body;
    if (proyectId && objetivo){
    const objetivo_ = new ObjetivosMong(objetivo);
    const savedObj = await objetivo_.save().catch(err=>console.log(err))
    const response = Proyecto.findOneAndUpdate(
        {"_id":proyectId},
        {"$push": { "Objetivos": savedObj._id }});
    return response;
    }else
    {
        return {error:'not_allowed'}
    }
}

var completeObjetivo = async function(idObj){
    console.log(idObj)
    let objetivo_ = await ObjetivosMong.findById(idObj).catch(err=>console.log(err))
    if (objetivo_){
        let proyect_ = await Proyecto.findById(objetivo_.ProyectoAsociado).catch(err=> console.log(err));
        if (proyect_?.Objetivos){
            proyect_.Objetivos = proyect_.Objetivos.filter(element => element != idObj);
            proyect_.save();
        }
        objetivo_.delete().catch(err=>console.log(err));
        return objetivo_;
    }else{
        return {error:'not_found'}
    }
}

var getProyectNameListFromUser = async function (UserSub){
    let queue = await UserItems.findOne({UserSub:UserSub}).populate('Proyectos').exec().catch(err=> console.log(err));
    let arrayResponse = []
    //console.log(queue);
    if (queue?.Proyectos){
        for (let i = 0 ;i<queue.Proyectos.length;i++){
            const {Titulo,_id} = queue.Proyectos[i];
            arrayResponse.push({Titulo,_id});
        }
    }
    return arrayResponse; 
}

var deleteProyecto = async function (idP) {
    let proyect_ = await Proyecto.findById(idP).catch(err=>console.log(err));
    //console.log(proyect_);
    if (proyect_){
        let state_ = await StateUser.findOne({UserSub:proyect_.UserSub}).catch(err=>console.log(err));
        let items_ = await UserItems.findOne({UserSub:proyect_.UserSub}).populate('Actividades').exec().catch(err=>console.log(err));
        if (state_){
            if (idP == state_.BaseProyect)
                return {error:'not_allowed'}
            if(items_?.Proyectos){
                items_.Proyectos = items_.Proyectos.filter(element => element != idP);
                
            }
            if (items_?.Actividades){
                items_.Actividades = items_.Actividades.filter(async act => {
                    if (act.ProyectoAsociado == idP){
                        await Actividades_.findOneAndUpdate({_id:act._id},{ProyectoAsociado:null});
                        return false;
                    }
                    return true;
                });
            }
            items_?.save();
        }
        proyect_.Objetivos?.forEach(ObjetivoId=>ObjetivosMong.deleteOne({_id:ObjetivoId}).exec())
        proyect_.Logros?.forEach(logroId=> Logros_.deleteOne({_id:logroId}).exec())
        Puntaje.deleteOne({_id:proyect_.Puntajes}).exec();
        const resp = await proyect_.delete().catch(err=>console.log(err));
        return resp;

    }
    
}


module.exports.createProyect = createProyect;
module.exports.getProyectById = getProyectById;
module.exports.getProyectListFromUser = getProyectListFromUser;
module.exports.addObjetivo = addObjetivo;
module.exports.completeObjetivo = completeObjetivo;
module.exports.sumarPuntos = sumarPuntos;
module.exports.getProyectNameListFromUser = getProyectNameListFromUser;
module.exports.deleteProyecto = deleteProyecto;