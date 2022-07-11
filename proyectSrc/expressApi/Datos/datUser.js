var User = require('../Esquemas/scUser');
//var mongoose = require('mongoose');

var getUser = async function (idUser){
    console.log(idUser)
    var response = await User.findById(idUser).catch(err=> console.log(err));
    console.log(response);
    return response;
}

var createUser = async function(user){
    const newusr = new User(user).catch(err=> console.log(err))

    await newusr.save()
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

module.exports.getUser = getUser;
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
