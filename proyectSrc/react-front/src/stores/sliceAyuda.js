import { createSlice } from "@reduxjs/toolkit";
import DisplayAyuda from "../components/Ayuda/DisplayAyuda";

export const ayudaSlice = createSlice({
    name:'ayuda',
    initialState:{
        value:{
            display:false,
            content: "Adfasdfasdfasdfsadf",
            title: "Inicio"
        }
        
    },
    reducers:{
        changeContent: (state,action)=>{
            state.value.content = action.payload;
        },
        changeTittle: (state,action) =>{
            state.value.title = action.payload;
        },
        mostrarAyuda: (state)=>{
            state.value.display=true
        },
        changePage: (state,action)=>{
            state.value.content = action.payload.content;
            state.value.title = action.payload.title;
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
export const {mostrarAyuda,ocultarAyuda,
    changePage,changeTittle,
    changeContent,restoreContent} = ayudaSlice.actions
export default ayudaSlice.reducer