import { numerosDict,backExpresions,confirmExpresions } from "./constants";

const getCommandsPage = (methods) =>{
    const comando = [{
        command: ["Crear una Pendiente(.)","Agregar una Pendiente(.)","Agregar(.)"],
        callback: (frase) =>{
            methods.initCrearPendiente();
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.85  
     },
     {
        command: backExpresions,
        callback: (frase) =>{
            methods.handleBack();
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.7,
        bestMatchOnly:true
     }
    ]
    return comando;
}

const validDict = {"título":null,"descripción":null}
const getAgregarComands = (methods) =>{
    const comando = [
     {
        command: ["Escribir (el)(la) *(.)"],
        callback: (frase)=>{
            const lower = frase.toLowerCase()
            if (lower in validDict)
                methods.setPunteroPage(lower);
        }
     },
     {
        command: ["Dejar de Escribir"],
        callback: (frase)=>{
            methods.setPunteroPage(null);
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.8        
     },
     {
        command: ["(El) Peso *(.)","(Los) Pesos *(.)","(La) Importancia *(.)","(Las) Importancias *(.)"],
        callback: (frase)=>{
            methods.setPunteroPage(null);
            let peso = 4;
            const numeroString = frase.toLowerCase();
            if (isNaN(parseInt(numeroString))){
                if(numeroString in numerosDict)
                    peso = numerosDict[numeroString];
            }else{
                peso = parseInt(frase.toLowerCase());
            }            
            if (peso < 0)
                peso = 1
            if (peso > 7)
                peso = 7
            methods.setPesosAudio(peso);            
        }
     },
     {
        command: [...confirmExpresions,"Agregar(.)"],
        callback: (frase)=>{
            methods.setPunteroPage(null);
            methods.agregarActividad();
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.85,
        bestMatchOnly:true
     }
    ]
    return comando;
}


export {getCommandsPage,getAgregarComands}