var User = require('../Esquemas/scUser');
//var mongoose = require('mongoose');

var getUsers = async function (){
    var response = await User.find().catch(err=> console.log(err));
    return response;
}

var getUsersID = async function (id){
    var response = await User.findById(id).catch(err=> console.log(err));
    return response;
}

var createUser = async function(user){
        const newusr = new User(user)
        await newusr.save().catch(err=> console.log(err))
}

var updateUser = async function(id, update){
    const updateUser = await User.updateOne({_id:id}, update).catch(
        err=> console.log(err))
    return updateUser
}

var deleteUser = async function(id){
    await User.findByIdAndDelete(id)
 }

module.exports.getUsers = getUsers;
module.exports.getUsersID = getUsersID;
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
