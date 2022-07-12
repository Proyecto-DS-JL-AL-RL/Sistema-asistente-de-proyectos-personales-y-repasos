var Tarjeta = require('../Esquemas/schTarjeta');

var createCard = async function(card){
    console.log(card)
    const newcard = new Tarjeta(card)
    await newcard.save().catch(err=> console.log(err))
}


var getCard = async function (){
    var response = await Tarjeta.find().catch(err=> console.log(err));
    return response;
}

var getCardID = async function (id){
    var response = await Tarjeta.findById(id).catch(err=> console.log(err));
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

module.exports.createCard = createCard;
module.exports.getCard = getCard;
module.exports.getCardID = getCardID;
module.exports.deleteCard = deleteCard;
module.exports.updateCard = updateCard;


