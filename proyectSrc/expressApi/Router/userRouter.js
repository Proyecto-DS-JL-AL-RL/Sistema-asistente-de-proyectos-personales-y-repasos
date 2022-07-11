var datUser = require('../Datos/datUser');
const express = require("express")
const router = express.Router();


router.get('/user/:idUser', async function(req,res){
    let resp = await datUser.getUser(req.params.idUser);
    res.send(resp);
});


module.exports = router;
