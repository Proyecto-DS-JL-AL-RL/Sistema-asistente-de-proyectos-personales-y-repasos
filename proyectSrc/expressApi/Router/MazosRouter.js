var datMazos = require('../Datos/datMazos');
const express = require("express")
const router = express.Router();

router.post('/mazos', async function (req, res){
    await datMazos.createMazos(req.body)
    res.send('Mazo creado')
})

router.get('/mazos', async function (req, res){
    let resp = await datMazos.getMazos();
    res.json(resp);
})

router.get('/mazos/:id', async function(req,res){
    let resp = await datMazos.getMazosByUserID(req.params.id);
    res.json(resp);
});

router.get('/mazosID/:id', async function(req,res){
    let resp = await datMazos.getMazosByID(req.params.id);
    res.json(resp);
});

router.delete('/mazos/:id', async function(req,res){
    await datMazos.deleteMazos(req.params.id);
    res.send('Mazo eliminado')
});

router.put('/mazos/:id', async function(req,res){
    //console.log(req.body)
    let resp = await datMazos.updateMazos(req.params.id, req.body);
    res.json(resp);
});

//router.put('/tarjetas/puntos/:id', async function(req,res){
    //console.log(req.body)
    //let puntaje = ((4-req.body.intentos)/4)*300
    //let update = {}
    //update['$set'] = {}
    //let key_puntos = "Tarjetas."+(req.body.index-1)+".Puntos"
    //update['$set'][key_puntos] =  puntaje
    //console.log(update)
    //let resp = await datMazos.updateMazos(req.params.id, update);
    //res.json(resp);
//});

module.exports = router;
