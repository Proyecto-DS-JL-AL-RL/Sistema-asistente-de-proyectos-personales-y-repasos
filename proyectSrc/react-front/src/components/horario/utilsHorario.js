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
export const temaChangeCSS = (id) =>{
    const temas = [
        ['rgb(255, 205, 113)','rgb(90, 206, 241)','rgb(29, 241, 138)','rgb(228, 228, 32)','#a270f9','black'],
        ['rgb(0, 173, 247)','rgb(255, 240, 110)','rgb(136, 255, 251)','rgb(255, 71, 51)','#a270f9','black'],
        ['rgb(188, 192, 194)','rgb(98, 98, 98)','rgb(88, 88, 88)','rgb(186, 186, 186)','#706e6e','white'],
        ['rgb(7, 172, 255)','rgb(255, 55, 0)','rgb(43, 255, 0)','rgb(28, 88, 255)','#a270f9','black']
    ]
    const r = document.querySelector(':root');
    for(let i =0 ;i<5;i++){
        const itemSet = `--color-horario-${i+1}`;
        r.style.setProperty(itemSet,temas[id][i]);
    }
    r.style.setProperty('--color-text-tabla',temas[id][5]);
    r.style.setProperty('--color-horario-6',(temas[id][5]=='white'?'black':'white'));
}   