var Proyecto = require('../Esquemas/schProyecto');
var UserItems =require('../Esquemas/schUserQueue');

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
    var response = await Proyecto.findById(id).catch(err=> console.log(err));
    return response;
}

var getProyectListFromUser = async function(UserSub){
    //console.log('userSub'+UserSub);
    let queue = await UserItems.findOne({UserSub:UserSub}).populate('Proyectos').exec().catch(err=> console.log(err));
    return queue.Proyectos;    
}

var addObjetivo = async function(body){

}

var completeObjetivo = async function(body){

}

module.exports.createProyect = createProyect;
module.exports.getProyectById = getProyectById;
module.exports.getProyectListFromUser = getProyectListFromUser;
module.exports.addObjetivo = addObjetivo;
module.exports.completeObjetivo = completeObjetivo;
