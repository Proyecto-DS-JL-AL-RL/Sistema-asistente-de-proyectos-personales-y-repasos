
const express = require('express');
const router = express.Router();
const {ConfigHorario,Horario} = require('../Esquemas/schHorario');
const User = require('../Esquemas/scUser');

router.get('/horario', async (req,res)=>{
    const hor = await Horario.find();
    res.json(hor);
})
//Iniciar Horario
router.get('/horarioInit/:id',async (req,res)=>{
    const uss = await User.find({userSub:req.params.id}).catch(err =>console.log(err));
    if(uss.length>0){
        const response = await Horario.findOne({userSub:req.params.id}).populate("config").catch(err =>console.log(err));
        if(response){
            res.json(response);
        }else{
            const newConfig = new ConfigHorario({userSub:req.params.id});
            const newHorario = new Horario({userSub:req.params.id,config:newConfig});
            await newHorario.save();
            await newConfig.save();
            res.json(newHorario);
        }
    }
    else{
        res.json({error:"No existe un usuario con dicho id"});
    }
    
    //return;
    //const res = await Horario.find({"UserSub":req.params.id}).catch(err =>console.log(err));
    //res.json(res);
})
//Actualizar configuracion horario
router.patch('/horarioconfig/:id', async (req,res)=>{
    const {intervaloDefault,intervalo , tema,sobrescribir} = req.body;
    const config = await ConfigHorario.findOne({userSub:req.params.id});
    //console.log(typeof(defaultIntervalo),typeof(tema),sobreescribir);
    if(!config){
        res.json({error:"Id usser"});
        return;
    }
    if(typeof(intervalo) === 'object') config.intervalo = intervalo;
    if(typeof(intervaloDefault) === 'boolean') config.intervaloDefault = intervaloDefault;
    if(typeof(tema)==='number') config.tema = tema;
    if(typeof(sobrescribir) === 'boolean') config.sobrescribir = sobrescribir;
    await config.save();
    res.json(config);

})
//Actualizar horario
router.patch('/horario/:id',async (req,res)=>{
    //console.log(req.body.horario);
    const horario = await Horario.findOne({userSub:req.params.id});
    if(!horario){
        res.json({error:"Id usser"});
        return;
    }
    if(!Array.isArray(req.body.horario)){
        res.json({error:"Envio invalido"});
        return;   
    }
    horario.horario = req.body.horario;
    await horario.save();
    res.json(horario)
})

module.exports = router;