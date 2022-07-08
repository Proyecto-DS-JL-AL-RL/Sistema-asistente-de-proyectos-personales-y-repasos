
const paths = {
    "inicio": "/",
    "dame algo que hacer":"/algoQueHacer",
    "darme algo que hacer":"/algoQueHacer",
    "Repasos":"/Mazos",
    "mazos":"/Mazos",
    "cartas":"/",
    "proyecto":"/proyect",
    "Dashboard":"/proyect"
}



const getCommands = (location,history) =>{
    const comando = [{
        command: ["Llévame a *"],
        callback: (frase) =>{
            //alert(frase);
            const path = paths[frase]
            if (path != null && path != undefined){
                if (path != location.pathname){
                    history.push(path);
                }                   
                else    
                    alert("Ya se encuentra en esa pagina");                
            }            
        }
    },
    {
        command: ["Llévame a *."],
        callback: (frase) =>{
            //alert(frase);
            const path = paths[frase]
            if (path != null && path != undefined){
                if (path != location.pathname){
                    history.push(path);
                }                   
                else    
                    alert("Ya se encuentra en esa pagina");                
            }            
        }
    },
    {
        command: ["Dame algo que hacer."],
        callback: (frase) =>{
            //alert(frase);
            history.push('/algoQueHacer')            
        }
    }]

    return comando;
}


export {getCommands}