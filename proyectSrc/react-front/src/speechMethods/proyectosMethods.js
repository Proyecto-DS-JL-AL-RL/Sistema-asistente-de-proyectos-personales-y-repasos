import { numerosDict,backExpresions,continueExpresions } from "./constants";

const getCommandsPage = (methods) =>{
    const comando = [{
        command: ["Crear(.)","Agregar(.)","Crear Proyecto(.)","Nuevo Proyecto(.)","Agregar Proyecto(.)"],
        callback: (frase) =>{
            methods.addCreateProyect();
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
        command: [...continueExpresions,"Agregar(.)" ],
        callback: (frase) =>{
            methods.handleContinuar();
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.85 ,
        bestMatchOnly:true 
     },
     {
        command: ["Escribir(,) *(.)","Escribir(,) (el )título(,) *(.)","(Me) Escribe(,) (el )título(,) *(.)","Título(,) *(.)"],
        callback: (frase)=>{
            let scriptT = ''
            if (frase.length > 0)
                scriptT += frase.charAt(0).toUpperCase();
            if (frase.length > 1)
                scriptT = scriptT  + frase.slice(1);
            methods.setTituloInput(scriptT);
        }
     }
    ]
    return comando;
}




export {getCommandsPage}