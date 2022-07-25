import { numerosDict,backExpresions,confirmExpresions } from "./constants";

const getCommandsPage = (methods) =>{
    const comando = [{
        command: ["Crear (un) Pendiente(.)","Agregar (un) Pendiente(.)","Agregar(.)"],
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

const getAgregarComands = (methods) =>{
    const comando = [
        {
            command: ["Escribir(,) (el )título(,) *(.)","(Me) Escribe(,) (el )título(,) *(.)","Título(,) *(.)"],
            callback: (frase)=>{
                let scriptT = ''
                if (frase.length > 0)
                    scriptT += frase.charAt(0).toUpperCase();
                if (frase.length > 1)
                    scriptT = scriptT  + frase.slice(1);
                methods.setTitulo(scriptT);
            }
         },
         {
            command: ["Escribir(,) (la )(las )descripción(,) *(.)","(Me) Escribe(,) (la )descripción(,) *(.)","Descripción(,) *(.)"],
            callback: (frase)=>{

                let scriptT = ''
                if (frase.length > 0)
                    scriptT += frase.charAt(0).toUpperCase();
                if (frase.length > 1)
                    scriptT = scriptT  + frase.slice(1);
                methods.setDescripcion(scriptT);
            }
         },
     {
        command: ["(El) Peso *(.)","(Los) Pesos *(.)","(La) Importancia *(.)","(Las) Importancias *(.)"],
        callback: (frase)=>{
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