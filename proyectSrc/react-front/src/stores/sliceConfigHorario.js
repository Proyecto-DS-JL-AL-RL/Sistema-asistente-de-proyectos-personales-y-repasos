import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { temaChangeCSS } from "../components/horario/utilsHorario";


export const getIniHorarioConfig = createAsyncThunk('configHorario/getIniHorario', async (sub)=>{
    const response= await fetch(`http://localhost:4000/api/horarioInit/${sub}`);
    const rpta = await response.json();
    const {intervalo,sobrescribir, intervaloDefault,tema}=rpta.config;
    temaChangeCSS(tema);
    return {intervalo,sobrescribir:sobrescribir,intervaloDefault,tema};
} )

export const configHorarioSlice = createSlice({
    name:'configHorario',
    initialState:{
        value:{
            sobrescribir:true,
            tema:0,
            intervaloDefault:false,
            //intervaloMaxMin:[6,18],
            intervalo: [4,20]
        },
        base:null
    },
    reducers:{
        restoreValueConfig:(state)=>{
            state.value = state.base;
        },
        changeBase:(state)=>{
            state.base = state.value;
        },
        changeSobreescribir: (state,action)=>{
            state.value.sobrescribir = action.payload
        },
        changeIntervalo : (state,action) =>{
            //console.log("Payload",action.payload)
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
    },
    extraReducers:builder =>{
        builder
        .addCase(getIniHorarioConfig.fulfilled, (state,action)=>{
            state.value = action.payload;
        })
    }
})
export const {changeSobreescribir,changeIntervalo,changeBase,restoreValueConfig,
    changeTema,intervaloOverFlow,changeIntervaloDefault} = configHorarioSlice.actions;
export default configHorarioSlice.reducer;