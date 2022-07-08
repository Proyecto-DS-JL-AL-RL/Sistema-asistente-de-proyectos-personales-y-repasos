import {actividad2intervalo} from './utilsHorario'
class Actividad{
    constructor(nombre,acr,descrip,dia,inicio,fin,estado,link=''){
        this.nombre=nombre;
        this.acr=acr;
        this.descrip = descrip;
        this.dia=dia;
        this.inicio=inicio;
        this.fin=fin;
        this.link = link;
        this.intervalo = actividad2intervalo(this);
        this.estado = estado;
    }
    
    getIntervalo(dia,inicio,fin){
        const arr=[];
        for(let i=inicio;i<fin;i++){
            arr.push((i+1)*8+dia+1);
        }
        return arr;
    }
} 

const toSerial = (obj) =>{
    return JSON.parse(JSON.stringify(obj))
}
const actividadesInfo=[
    
    toSerial(new Actividad('hola',"htr","XDXD",0,8,10,0)),
    toSerial(new Actividad('hola1',"jtr","XDXDa",1,10,12,0)),
    toSerial(new Actividad('hola12',"jor","XDXDa3",2,14,16,0)),
    toSerial(new Actividad('hola13',"ela","XDXDa2",3,14,19,0)),
    toSerial(new Actividad('hola41',"mis","XDXDa1",4,5,7,0)),
    toSerial(new Actividad('Interaccion Humano Computador',"IHC","curso de universidad",1,14,16,0,' https://uni-pe.zoom.us/j/81142113561?pwd=aElhM1VzOHg1TjJPd3JjL25MN0Zadz09')),

]
export {actividadesInfo ,Actividad};
