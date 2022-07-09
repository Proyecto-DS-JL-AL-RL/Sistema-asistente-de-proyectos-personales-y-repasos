export const actividad2intervalo = (actividad) =>{ 
    let array = Array.from({length:actividad.fin-actividad.inicio}, (_,i)=>{
        return 8*(i+actividad.inicio+1)+actividad.dia+1;
    })
    return array
}
