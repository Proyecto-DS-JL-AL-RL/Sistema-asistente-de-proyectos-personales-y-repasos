//var datProyecto = require('../Datos/datUser');
const express = require("express")
const router = express.Router();


router.get('/proyecto/:userSub', async function(req,res){
    //let resp = await datUser.getUsers();
    //res.json(resp);
});

router.put('/proyecto/add/:userSub', async function(req,res){
    //let resp = await datUser.updateUser(req.params.id, req.body);
    //res.json(resp);
});

//Init
router.post('/proyecto', async function (req, res){
    //await datUser.createUser(req.body)
    //res.send('usuario creado')
})

router.delete('/proyecto/:userSub', async function(req,res){
    //await datUser.deleteUser(req.params.id);
    //res.send('usuario eliminado')
});


module.exports = router;