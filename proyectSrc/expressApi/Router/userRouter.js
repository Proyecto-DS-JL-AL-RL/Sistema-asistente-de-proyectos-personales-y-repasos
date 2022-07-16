var datUser = require('../Datos/datUser');
const express = require("express")
const router = express.Router();


router.get('/users', async function(req,res){
    let resp = await datUser.getUsers();
    res.json(resp);
});

router.get('/users/:id', async function(req,res){
    console.log(req.params.id)
    let resp = await datUser.getUsersID(req.params.id);
    res.json(resp);
});


router.put('/users/:id', async function(req,res){
    let resp = await datUser.updateUser(req.params.id, req.body);
    res.json(resp);
});

router.post('/users', async function (req, res){
    await datUser.createUser(req.body)
    res.send('usuario creado')
})

router.delete('/users/:id', async function(req,res){
    await datUser.deleteUser(req.params.id);
    res.send('usuario eliminado')
});


module.exports = router;
