import { createSlice } from "@reduxjs/toolkit";

export const configHorarioSlice = createSlice({
    name:'configHorario',
    initialState:{
        value:{
            sobrescribir:true,
            tema:[],
            intervaloDefault:true,
            intervalo: [0,1]
        }

    },
    reducers:{
        changeSobreescribir: (state,action)=>{
            state.value.sobrescribir = action.payload
        },
        changeIntervaloDefault : (state,action) =>{
            state.value.intervalo= action.payload
        },
        changeTema :(state,action) =>{
            state.value.tema = action.payload
        }
    }
})
export const {changeSobreescribir,changeIntervaloDefault,
    changeTema} = configHorarioSlice.actions;
export default configHorarioSlice.reducer;