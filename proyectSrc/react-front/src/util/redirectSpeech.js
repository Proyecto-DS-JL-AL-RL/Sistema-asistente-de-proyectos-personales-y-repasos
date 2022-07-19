
const paths = {
    "inicio": "/",
    "dame algo que hacer":"/algoQueHacer",
    "darme algo que hacer":"/algoQueHacer",
    "repasos":"/Mazos",
    "mazos":"/Mazos",
    "cartas":"/",
    "proyectos":"/proyectos",
    "dashboard":"/proyect"
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
            history.push('/algoQueHacer')            
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.85    
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