
const paths = {
    "inicio": "/",
    "dame algo que hacer":"/algoQueHacer",
    "darme algo que hacer":"/algoQueHacer",
    "repasos":"/Mazos",
    "mazos":"/Mazos",
    "cartas":"/",
    "proyectos":"/proyectos",
    "dashboard":"/proyect",
    "cola de actividades":"/activityQueue",
}



const getCommands = (location,history,setAfterCommandFlag,lAfterComandFlag) =>{
    const comando = [{
        command: ["Llévame a *(.)"],
        callback: (frase) =>{
            const path = paths[frase.toLowerCase()]
            if (path != null && path != undefined){
                if (path != location.pathname){
                    history.push(path);
                }                   
                else    
                    alert("Ya se encuentra en esa pagina");                
            }            
        },
    },
    {
        command: "Dame algo que hacer(.)",
        callback: (command,spokeNPhrase,ratio) =>{
            if (location.pathname == '/algoQueHacer')
                return;
            else
                history.push('/algoQueHacer')            
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.85    
    },
    {
        command: ["Gestionar Proyectos(.)","Ver proyectos(.)","Mis Proyectos(.)"],
        callback: (command,spokeNPhrase,ratio) =>{
            history.push('/proyectos')            
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.85,
        bestMatchOnly:true    
    },
    {
        command: ["Quiero repasar(.)","Ver mis Mazos(.)","Tarjetas de repaso(.)"],
        callback: (command,spokeNPhrase,ratio) =>{
            history.push('/Mazos')            
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.85  ,
        bestMatchOnly:true    
    },
    {
        command: ["Organizador de actividades(.)","Organizar actividades(.)"],
        callback: (command,spokeNPhrase,ratio) =>{
            history.push('/horario')            
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.85 ,
        bestMatchOnly:true  
    },
    {
        command: ["Ver cola de actividades(.)","Cola de Actividades(.)"],
        callback: (command,spokeNPhrase,ratio) =>{
            history.push('/activityQueue')            
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.85 ,
        bestMatchOnly:true  
    },
    {
        command: "g",
        callback: (command,spokeNPhrase,ratio) =>{
            if (!lAfterComandFlag)
                setAfterCommandFlag(true);         
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0    
    }]

    return comando;
}


export {getCommands}