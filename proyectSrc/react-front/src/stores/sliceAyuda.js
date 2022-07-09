import { createSlice } from "@reduxjs/toolkit";
import DisplayAyuda from "../components/Ayuda/DisplayAyuda";

export const ayudaSlice = createSlice({
    name:'ayuda',
    initialState:{
        value:{
            display:false,
            content: "Adfasdfasdfasdfsadf"
        }
        
    },
    reducers:{
        changeContent: (state,action)=>{
            console.log()
            state.value.content = action.payload;
        },
        mostrarAyuda: (state)=>{
            state.value.display=true
        },
        ocultarAyuda: (state) =>{
            state.value.display = false
        },
        restoreContent: (state) =>{
            state.value = {
                display:false,
                content: "No hay ayuda disponible"
            }
        }
    }


})
export const {mostrarAyuda,ocultarAyuda,changeContent,restoreContent} = ayudaSlice.actions
export default ayudaSlice.reducer