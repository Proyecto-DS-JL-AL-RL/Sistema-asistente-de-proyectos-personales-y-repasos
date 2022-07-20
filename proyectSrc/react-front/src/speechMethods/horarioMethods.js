import { numerosDict,backExpresions,continueExpresions } from "./constants";

const dictRef = {"la opción a":"a","la opción b":"b","la opción c":"c","la opción d":"d"}

const arrayDias = ["lunes","martes","miércoles","jueves","viernes","sábado","domingo"]
const validDict = {"nombre":null,"descripción":null,"acrónimo":null}
//handleDuracionInicio,handleDuracionFin e.target.value
const getDescCommands = (methods) =>{
    const comando = [{
        command: ["Lunes(.)","Martes(.)","Miércoles(.)","Jueves(.)","Viernes(.)","Sábado(.)","Domingo(.)"],
        callback: (command,spoken,ratio) =>{
            methods.setPunteroPage(null);
            const ind = arrayDias.indexOf(command.toLowerCase())
            if (ind > 0 && ind < 7){
                methods.handleDia(ind);
            }
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.7,
        bestMatchOnly:true 
     },
     {
        command: ["Desde (las)(la) *(.)"],
        callback: (phrase) =>{
            methods.setPunteroPage(null);
            //alert(phrase)
            const lower = phrase.toLowerCase();
            let inicio = 0;
            if (isNaN(parseInt(lower))){
                if (lower in numerosDict)
                    inicio = numerosDict[lower];
            }else{
                inicio = parseInt(lower);
            }
            //alert(inicio)
            if (inicio < 0) inicio = 0;
            if (inicio > 24) inicio = 24;
            const e = {target:{value:inicio}}
            methods.handleDuracionInicio(e);
        }
     },
     {
        command: ["Hasta (las)(la) *(.)"],
        callback: (phrase) =>{
            methods.setPunteroPage(null);
            //alert(phrase)
            const lower = phrase.toLowerCase();
            let fin = 24;
            if (isNaN(parseInt(lower))){
                if (lower in numerosDict)
                    fin = numerosDict[lower];
            }else{
                fin = parseInt(lower);
            }
            //alert(inicio)
            if (fin < 0) fin = 0;
            if (fin > 24) fin = 24;
            const e = {target:{value:fin}}
            methods.handleDuracionFin(e);
        }
     },
     {
        command: ["Desde (las)(la) * hasta (las)(la) *(.)"],
        callback: (phrase,phrase2) =>{
            methods.setPunteroPage(null);
            //alert ([phrase,phrase2].join('-'))
            const lower1 = phrase.toLowerCase();
            let inicio = 0;
            if (isNaN(parseInt(lower1))){
                if (lower1 in numerosDict)
                    inicio = numerosDict[lower1];
            }else{
                inicio = parseInt(lower1);
            }

            if (inicio < 0) inicio = 0;
            if (inicio > 24) inicio = 24;
            const e1 = {target:{value:inicio}}
            const lower = phrase2.toLowerCase();
            let fin = 24;
            if (isNaN(parseInt(lower))){
                if (lower in numerosDict)
                    fin = numerosDict[lower];
            }else{
                fin = parseInt(lower);
            }
            //alert(inicio+'-'+fin)
            if (fin < 0) fin = 0;
            if (fin > 24) fin = 24;
            const e = {target:{value:fin}}
            if (inicio<fin){
                methods.setDuracion([inicio,fin]);

                methods.setDuracionFin(fin);
            }
        }
     },
     {
        command: ["Crear(.)","Confirmar(.)","Terminar(.)","Aceptar(.)"],
        callback: (command,spoken,ratio) =>{
            methods.setPunteroPage(null);
            methods.handleClickState();
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.7,
        bestMatchOnly:true 
     },
     {
        command: ["(¿)Escribir (el)(la) *(.)(?)"],
        callback: (frase)=>{
            //alert(frase)
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
     }
    ]
    return comando;
}


export {getDescCommands}