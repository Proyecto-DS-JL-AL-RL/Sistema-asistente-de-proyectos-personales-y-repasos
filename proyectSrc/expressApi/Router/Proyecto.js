var datProyecto = require('../Datos/datProyectos');
const express = require("express")
const router = express.Router();


router.get('/Proyectos/:userSub', async function(req,res){
    let resp = await datProyecto.getProyectListFromUser(req.params.userSub);
    res.json(resp);
});

router.get('/Proyectos/getProyecto/:id', async function(req,res){
    const resp = await datProyecto.getProyectById(req.params.id);
    res.json(resp);
});

router.post('./Proyectos/addProyect', async function(req,res){
    const resp = await datProyecto.createProyect(req.body);
});

router.post('/Proyectos/addObjetivo', async function(req,res){
    let resp = await datProyecto.addObjetivo(req.body);
    res.json(resp);
});

//Init
router.post('/Proyectos/endObjetive', async function (req, res){
    const resp = await datProyecto.completeObjetivo(req.body);
    res.send(resp)
})


module.exports = router;