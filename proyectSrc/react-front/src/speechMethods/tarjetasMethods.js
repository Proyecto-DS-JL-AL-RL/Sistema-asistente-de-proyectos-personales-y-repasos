import { numerosDict,backExpresions,continueExpresions } from "./constants";

const dictRef = {"la opción a":"a","la opción b":"b","la opción c":"c","la opción d":"d"}

const getInGameCommands = (methods) =>{
    const comando = [{
        command: ["(La )Opción A(.)","(La) Opción B(.)","(La) Opción C(.)","(La) Opción D(.)"],
        callback: (command,spoken,ratio) =>{
            const lett = command.toLowerCase();
            console.log('Command-',lett)
            if (lett in dictRef)
                methods.handleOption(dictRef[lett])
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.7,
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


export {getInGameCommands}