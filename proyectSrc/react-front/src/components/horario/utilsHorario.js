export const actividad2intervalo = (actividad) =>{ 
    let array = Array.from({length:actividad.fin-actividad.inicio}, (_,i)=>{
        return 8*(i+actividad.inicio+1)+actividad.dia+1;
    })
    return array
}
export const minHoraIntervalo = (actividades) =>{
    let min=0;
    actividades.map((e,i)=>{
        if(i==0) min=e.inicio;
        else{
            if(min>e.inicio) min=e.inicio;
        }
    })
    return min+1;
}
export const maxHoraIntervalo = (actividades) =>{
    let max = 0;
    actividades.map((e,i)=>{
        if(max<e.fin) max=e.fin;
    })
    return max;
}
export const actividades2Intervalo = (actividades) =>{
    return [minHoraIntervalo(actividades),maxHoraIntervalo(actividades)]
}
export const act2horario = (actividades,estados = [0,1,2]) =>{
    const act = []
    actividades.forEach((e) => {
        if(estados.indexOf(e.estado)!=-1){
            act.push(...e.intervalo)
        }
    });
    return act.sort((a,b)=>{return a-b});
}