const actividad2intervalo = (actividad) =>{ 
    let array = Array.from({length:actividad.fin-actividad.inicio}, (_,i)=>{
        return i+actividad.inicio;
    })
}
export default {actividad2intervalo};