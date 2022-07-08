import { createSlice } from "@reduxjs/toolkit";
import DisplayAyuda from "../components/Ayuda/DisplayAyuda";

export const ayudaSlice = createSlice({
    name:'ayuda',
    initialState:{
        value:{
            display:false,
            content: <DisplayAyuda content={"Adfasdfasdfasdfsadf"}/>
        }
        
    },
    reducers:{
        changeContent: (state,action)=>{
            state.value.content = <DisplayAyuda content={action.payload}/>;
        },
        mostrarAyuda: (state)=>{
            state.value.display=true
        },
        ocultarAyuda: (state) =>{
            state.value.display = false
        }
    }


})
export const {mostrarAyuda,ocultarAyuda,changeContent} = ayudaSlice.actions
export default ayudaSlice.reducer