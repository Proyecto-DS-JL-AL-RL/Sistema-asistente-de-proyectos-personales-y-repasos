var User = require('../Esquemas/scUser');
//var mongoose = require('mongoose');

var getUsers = async function (){
    var response = await User.find().catch(err=> console.log(err));
    console.log(response)
    return response;
}

var createUser = async function(user){
        const newusr = new User(user)
        await newusr.save().catch(err=> console.log(err))
}

var updateUser = async function(user, update){
    const updateUser = await User.findOneAndUpdate(user, update, {
        new: true
      }).catch(err=> console.log(err))
    updateUser.save()
    return updateUser
}

var deleteUser = async function(id){
    await User.findByIdAndDelete(id)
 }

module.exports.getUsers = getUsers;
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
