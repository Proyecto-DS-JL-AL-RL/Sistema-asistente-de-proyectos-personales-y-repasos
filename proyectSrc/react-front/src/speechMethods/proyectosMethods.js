import { numerosDict,backExpresions,continueExpresions } from "./constants";

const getCommandsPage = (methods) =>{
    const comando = [{
        command: ["Crear(.)","Agregar(.)","Crear Proyecto(.)","Nuevo Proyecto(.)","Agregar Proyecto(.)"],
        callback: (frase) =>{
            methods.setEscribiendo(false);
            methods.addCreateProyect();
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.85 ,
        bestMatchOnly:true 
     },
     {
        command: backExpresions,
        callback: (frase) =>{
            methods.setEscribiendo(false);
            methods.handleBack();
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.85,
        bestMatchOnly:true 
     },
     {
        command: continueExpresions ,
        callback: (frase) =>{
            methods.setEscribiendo(false);
            methods.handleContinuar();
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.85 ,
        bestMatchOnly:true 
     },
     {
        command: ["Escribir (.)","Escribir Título(.)"] ,
        callback: (frase) =>{
            methods.setEscribir();
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.7  ,
        bestMatchOnly:true 
     },
     {
        command: ["Dejar de Escribir(.)"] ,
        callback: (frase) =>{
            methods.setEscribiendo(false);
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.7 ,
        bestMatchOnly:true 
     },

    ]
    return comando;
}




export {getCommandsPage}