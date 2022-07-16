//var datActividadesD = require('../Datos/datUser');
const express = require("express")
const router = express.Router();


router.get('/colaActividades/:userSub', async function(req,res){
    //let resp = await datUser.getUsers();
    //res.json(resp);
});

router.put('/colaActividades/addActividad/:userSub', async function(req,res){
    //let resp = await datUser.updateUser(req.params.id, req.body);
    //res.json(resp);
});

router.put('/actividadParcial/:idActividad', async function(req,res){
    //let resp = await datUser.updateUser(req.params.id, req.body);
    //res.json(resp);
});

//Init
router.post('/colaActividades', async function (req, res){
    //await datUser.createUser(req.body)
    //res.send('usuario creado')
})

router.delete('/colaActividades/deleteActividad/:userSub', async function(req,res){
    //await datUser.deleteUser(req.params.id);
    //res.send('usuario eliminado')
});




module.exports = router;