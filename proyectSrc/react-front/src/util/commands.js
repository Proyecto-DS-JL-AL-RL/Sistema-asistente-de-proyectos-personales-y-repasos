
const paths = {
    "inicio": "/inicio",
    "dame algo que hacer":"/algoQueHacer",
    "darme algo que hacer":"/algoQueHacer",
    "tarjetas":"/",
    "mazos":"/",
    "cartas":"/",
    "proyecto":"/proyect",
    "Dashboard":"/proyect"
}



const getCommands = (location,history) =>{
    const comando = [{
        command: ["Escribir *."],
        callback: (frase) =>{
            alert(frase);
            const path = paths[frase]
            if (path != null && path != undefined){
                if (path != location.pathname){
                    history.push(path);
                }                   
                else    
                    alert("Ya se encuentra en esa pagina");                
            }            
        }
    }]

    return comando;
}


export {getCommands}