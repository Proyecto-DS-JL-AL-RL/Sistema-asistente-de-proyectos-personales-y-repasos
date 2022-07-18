var datLogro = require('../Esquemas/schLogro');
var datUserItems = require('../Esquemas/schUserQueue');

var addLogro = async function(body){
    const {proyecto,logroBody} = body;
    //return logro;
}

var deleteLogroID = async function (id){
    //var response = await Actividad.findById(id).catch(err=> console.log(err));
    //return response;
}



module.exports.addLogro = addLogro;
module.exports.deleteLogroID = deleteLogroID;


