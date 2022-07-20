import { numerosDict,backExpresions,continueExpresions } from "./constants";

const getCommandsPage = (methods) =>{
    const comando = [{
        command: ["Dame una Actividad","Dame Algo que Hacer"],
        callback: (frase) =>{
            methods.giveAnActivity();
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.85 ,
        bestMatchOnly:true 
     },
     {
        command: backExpresions,
        callback: (frase) =>{
            methods.handleBack();
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.85,
        bestMatchOnly:true 
     },
     {
        command: continueExpresions ,
        callback: (frase) =>{
            methods.handleContinuar();
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.85 ,
        bestMatchOnly:true 
     }
    ]
    return comando;
}



const getCommandsActividad = (methods) =>{
    const comando = [{
        command: ["Agregar evidencia(.)","Evidencia(.)","Adjuntar(.)"],
        callback: (frase) =>{
            methods.setShowForm(true);
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.85  ,
        bestMatchOnly:true 
     },
     {
        command: ["Quitar evidencia(.)","Limpiar Evidencia(.)"],
        callback: (frase) =>{
            methods.limpiarEvidencia();
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.85,
        bestMatchOnly:true 
     },
     {
        command: backExpresions,
        callback: (frase) =>{
            methods.handleBack();
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.80,
        bestMatchOnly:true 
     },
     {
        command: [...continueExpresions,"Terminar(.)"],
        callback: (frase) =>{
            methods.handleContinuar();
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.85,
        bestMatchOnly:true  
     }
    ]
    return comando;
}

const dictTipo = {"url":"URL","link":"URL","archivo":"Archivo","imagen":"Imagen","uno":"URL","dos":"Imagen","tres":"Archivo","1":"URL","2":"Imagen","3":"Archivo"}
const getCommandsForm = (methods) =>{
    const comando = [
     {
        command: ["Tipo *(.)","(El) Tipo de *(.)"],
        callback: (frase) =>{
            const fraselow = frase.toLowerCase();
            if (fraselow in dictTipo)
                methods.setTipo(dictTipo[fraselow]);
        },
     },
     {
        command: ["Archivo(.)"],
        callback: (frase) =>{
            methods.setTipo("Archivo");
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.90,
        bestMatchOnly:true  
     },
     {
        command: ["Imagen(.)"],
        callback: (frase) =>{
            methods.setTipo("Imagen");
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.90,
        bestMatchOnly:true  
     },
     {
        command: continueExpresions,
        callback: (frase) =>{
            methods.handleContinuar();
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.85,
        bestMatchOnly:true  
     }
    ]
    return comando;
}


export {getCommandsPage,getCommandsActividad,getCommandsForm}