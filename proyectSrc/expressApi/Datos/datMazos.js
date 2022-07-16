var Mazos = require('../Esquemas/schMazos');

var createMazos = async function(card){
    console.log(card)
    const newcard = new Mazos(card)
    await newcard.save().catch(err=> console.log(err))
}


var getMazos = async function (){
    var response = await Mazos.find().catch(err=> console.log(err));
    return response;
}

var getMazosByUserID = async function (id){
    var response = await Mazos.find({"UserID":id}).catch(err=> console.log(err));
    return response;
}


var getMazosByID = async function (id){
    var response = await Mazos.findById(id).catch(err=> console.log(err));
    return response;
}

var updateMazos = async function(id, update){
    const updateCard = await Mazos.updateOne({_id:id}, update).catch(
        err=> console.log(err))
    return updateCard
}


var deleteMazos = async function(id){
    await Mazos.findByIdAndDelete(id)
 }

module.exports.createMazos = createMazos;
module.exports.getMazos = getMazos;
module.exports.getMazosByUserID = getMazosByUserID;
module.exports.getMazosByID = getMazosByID;
module.exports.deleteMazos = deleteMazos;
module.exports.updateMazos = updateMazos;
