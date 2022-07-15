import { createSlice } from "@reduxjs/toolkit";

export const configHorarioSlice = createSlice({
    name:'configHorario',
    initialState:{
        value:{
            sobrescribir:true,
            tema:[],
            intervaloDefault:false,
            intervaloMaxMin:[6,18],
            intervalo: [4,20]
        }

    },
    reducers:{
        changeSobreescribir: (state,action)=>{
            state.value.sobrescribir = action.payload
        },
        changeIntervalo : (state,action) =>{
            
            state.value.intervalo= action.payload
        },
        intervaloOverFlow : (state,action) =>{
            state.value.intervaloDefault = true;
            state.value.intervalo= action.payload
        },
        changeIntervaloDefault: (state,action) =>{
            state.value.intervaloDefault = action.payload;
        },
        
        changeTema :(state,action) =>{
            state.value.tema = action.payload
        }
    }
})
export const {changeSobreescribir,changeIntervalo,
    changeTema,intervaloOverFlow,changeIntervaloDefault} = configHorarioSlice.actions;
export default configHorarioSlice.reducer;