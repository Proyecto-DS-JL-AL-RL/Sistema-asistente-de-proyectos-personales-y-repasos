//console.log("Horario")
const drawHorario = () =>{
    const root = document.getElementById("root-horario");
    const canvas = document.getElementById("canvas-horario");
    const tamano =  root.getBoundingClientRect();
    //console.log(tamano,canvas);
    canvas.height = tamano.height-10;
    canvas.width = tamano.width -10;
    const context = canvas.getContext('2d');
    context.fillStyle = 'black';
    context.fillRect(0,0,tamano.width,tamano.height);
}
export {drawHorario};