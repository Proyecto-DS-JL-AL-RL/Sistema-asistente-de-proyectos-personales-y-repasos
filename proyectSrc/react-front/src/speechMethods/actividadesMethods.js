const getCommandsPage = (methods) =>{
    const comando = [{
        command: ["Crear una actividad(.)","Agregar una actividad(.)","Agregar(.)"],
        callback: (frase) =>{
            methods.initCrearActividad();
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.85  
     },
     {
        command: ["Volver(.)","Atrás(.)","Back(.)"],
        callback: (frase) =>{
            methods.handleBack();
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.7 
     }
    ]
    return comando;
}

const numeros = {
    "uno":1,
    "dos":2,
    "tres":3,
    "cuatro":4,
    "cinco":5,
    "seis":6,
    "siete":7
}


const getAgregarComands = (methods) =>{
    const comando = [
     {
        command: ["Escribir *(.)"],
        callback: (frase)=>{
            methods.setPunteroPage(frase.toLowerCase());
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
        command: ["(El) Peso *(.)","(Los) Pesos *(.)"],
        callback: (frase)=>{
            methods.setPunteroPage(null);
            //const peso = numeros[frase.toLowerCase()]
            const peso = parseInt(frase.toLowerCase());
            //alert(peso);
            methods.setPesosAudio(peso);            
        }
     },
     {
        command: ["Agregar Proyecto","Asociar Proyecto"],
        callback: (frase)=>{
            methods.setPunteroPage(null);
            methods.setAgregarProyecto(true);
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.8
     }
    ]
    return comando;
}


export {getCommandsPage,getAgregarComands}