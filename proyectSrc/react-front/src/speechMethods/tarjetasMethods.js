import { numerosDict,backExpresions,continueExpresions } from "./constants";

const dictRef = {"la opción a":"a","la opción b":"b","la opción c":"c","la opción d":"d"}

const getPageCommands = (methods) => {
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
         }
    ]
    return comando;
}

const getPageCommandsForm = (methods) => {
    const comando = [
        {
            command: ["Escribir(,) (la )pregunta(,) *(.)","(Me) Escribe(,) (la )pregunta(,) *(.)","Pregunta(,) *(.)"],
            callback: (frase)=>{
                let scriptT = ''
                if (frase.length > 0)
                    scriptT += frase.charAt(0).toUpperCase();
                if (frase.length > 1)
                    scriptT = scriptT  + frase.slice(1);
                methods.setPregunta(scriptT);
            }
         },
         {
            command: ["Escribir(,) (la )Opción 1(,) *(.)","Escribir(,) (la )Opción uno(,) *(.)","(Me) Escribe(,) (la )Opción uno(,) *(.)","(Me) Escribe(,) (la )Opción 1(,) *(.)","Opción(,) 1 *(.)","Opción(,) uno *(.)"],
            callback: (frase)=>{
                let scriptT = ''
                if (frase.length > 0)
                    scriptT += frase.charAt(0).toUpperCase();
                if (frase.length > 1)
                    scriptT = scriptT  + frase.slice(1);
                methods.setOpcion1(scriptT);
            }
         },
         {
            command: ["Escribir(,) (la )Opción 2(,) *(.)","Escribir(,) (la )Opción dos(,) *(.)","(Me) Escribe(,) (la )Opción dos(,) *(.)","(Me) Escribe(,) (la )Opción 2(,) *(.)","Opción(,) 2 *(.)","Opción(,) dos *(.)"],
            callback: (frase)=>{
                let scriptT = ''
                if (frase.length > 0)
                    scriptT += frase.charAt(0).toUpperCase();
                if (frase.length > 1)
                    scriptT = scriptT  + frase.slice(1);
                methods.setOpcion2(scriptT);
            }
         },
         {
            command: ["Escribir(,) (la )Opción 3(,) *(.)","Escribir(,) (la )Opción tres(,) *(.)","(Me) Escribe(,) (la )Opción 3(,) *(.)","(Me) Escribe(,) (la )Opción tres(,) *(.)","Opción(,) 3 *(.)","Opción(,) tres *(.)"],
            callback: (frase)=>{
                let scriptT = ''
                if (frase.length > 0)
                    scriptT += frase.charAt(0).toUpperCase();
                if (frase.length > 1)
                    scriptT = scriptT  + frase.slice(1);
                methods.setOpcion3(scriptT);
            }
         },
         {
            command: ["Escribir(,) (la )Opción 4(,) *(.)","Escribir(,) (la )Opción cuatro(,) *(.)","(Me) Escribe(,) (la )Opción 4(,) *(.)","(Me) Escribe(,) (la )Opción cuatro(,) *(.)","Opción(,) 4 *(.)","Opción(,) cuatro *(.)"],
            callback: (frase)=>{
                let scriptT = ''
                if (frase.length > 0)
                    scriptT += frase.charAt(0).toUpperCase();
                if (frase.length > 1)
                    scriptT = scriptT  + frase.slice(1);
                methods.setOpcion4(scriptT);
            }
         },
         ,
         {
            command: ["(Me) Escribe(,) (la )Opción correcta(,) *(.)","Escribir(,) (la )Opción correcta (es) (la)(,) *(.)","(La) Opción correcta (es) (la) *(.)"],
            callback: (frase)=>{
                let peso = 1;
                const numeroString = frase.toLowerCase();
                if (isNaN(parseInt(numeroString))){
                    if(numeroString in numerosDict)
                        peso = numerosDict[numeroString];
                }else{
                    peso = parseInt(frase.toLowerCase());
                }            
                if (peso < 0)
                    peso = 1
                if (peso > 4)
                    peso = 4
                methods.setRespuesta(peso);  
            }
         },
    ]
    return comando;
}


const getInGameCommands = (methods) =>{
    const comando = [{
        command: ["(La) Opción A(.)","(La) Opción B(.)","(La) Opción C(.)","(La) Opción D(.)"],
        callback: (command,spoken,ratio) =>{
            const lett = command.toLowerCase();
            console.log('Command-',lett)
            if (lett in dictRef)
                methods.handleOption(dictRef[lett])
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 1,
        bestMatchOnly:true 
     },
     {
        command: ["Anterior(.)","Atrás(.)","Volver(.)","Back(.)"],
        callback: (frase) =>{
            methods.previousCard();
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.70,
        bestMatchOnly:true 
     },
     {
        command: ["Siguiente(.)","Continuar(.)","Next(.)","Aceptar(.)","Listo(.)"],
        callback: (frase) =>{
            methods.nextCard();
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.70,
        bestMatchOnly:true 
     }
    ]
    return comando;
}


export {getInGameCommands,getPageCommands,getPageCommandsForm}