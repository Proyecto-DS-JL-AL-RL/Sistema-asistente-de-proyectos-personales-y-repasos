export const actividad2intervalo = (actividad) =>{ 
    /*if(actividad.fin==-1 || actividad.inicio==-1 || actividad.dia==-1 ){
        return [10]
    }*/
    let array = Array.from({length:actividad.fin-actividad.inicio}, (_,i)=>{
        return 8*(i+actividad.inicio+1)+actividad.dia+1;
    })
    console.log(array);
    return array
}
