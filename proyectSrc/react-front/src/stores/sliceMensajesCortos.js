import { createSlice } from "@reduxjs/toolkit";

export const mensajesCortosSlice = createSlice({
    name:'mensajesCortos',
    initialState:{
        value:{
            visible:false,
            content:"Hola yo te aviso"
        }
    },
    reducers:{
        setVisible : (state,action) =>{
            state.value.visible = action.payload;
        },
        setContent : (state,action) =>{
            state.value.content = action.payload;
        },
        setMensaje: (state,action) => {
            state.value.visible =  action.payload.visible;
            state.value.content = action.payload.content;
        }
    }
})
export const {setVisible,setContent,setMensaje} = mensajesCortosSlice.actions;
export default mensajesCortosSlice.reducer;