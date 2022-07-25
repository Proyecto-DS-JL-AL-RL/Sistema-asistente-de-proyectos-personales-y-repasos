import { createSlice } from "@reduxjs/toolkit";
import DisplayAyuda from "../components/Ayuda/DisplayAyuda";

export const tutorialSlice = createSlice({
    name:'ayuda',
    initialState:{
        value:{
            display:false,
            content: "Tutoriales de audio",
        }
        
    },
    reducers:{
        changeTutorial: (state,action)=>{
            state.value.content = action.payload;
        },
        mostrarTutorial: (state)=>{
            state.value.display=true
        },
        ocultarTutorial: (state) =>{
            state.value.display = false
        },
        restoreContentTutorial: (state) =>{
            state.value = {
                display:false,
                content: "No hay tutorial disponible"
            }
        }
    }


})
export const {changeTutorial,mostrarTutorial,
    ocultarTutorial,restoreContentTutorial} = tutorialSlice.actions
export default tutorialSlice.reducer