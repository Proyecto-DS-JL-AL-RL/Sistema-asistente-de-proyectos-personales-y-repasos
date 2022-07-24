import { createAsyncThunk ,createSlice } from "@reduxjs/toolkit";
//import { Actividad, actividadesInfo } from "../components/horario/HorarioInfo";


/*
  estados:{
    0:pertence,
    1:temporal,
    2:editando
  }
 */
export const getIniHorario = createAsyncThunk('horario/getIniHorario', async (sub)=>{
    const response= await fetch(`http://localhost:4000/api/horarioInit/${sub}`);
    const rpta = await response.json();
    return rpta.horario;
} )


export const horarioSlice = createSlice({
    name:'horario',
    initialState:{
        value: []
    },
    reducers:{
        iniciarHorario:(state,action)=>{
            //console.log(action.payload,"Slice");
            state.value = action.payload;
        },
        addActivity: (state,action) =>{
            const activities = state.value.filter((e)=>{
                return (e.estado!=1)
            })
            
            state.value = [...activities,action.payload]
        },
        deleteActivity: (state,action) => {
            
            state.value = state.value.filter((e)=>{
                return (e.intervalo.indexOf(action.payload)==-1)
            })
        },
        restoreActivity : (state)=>{
            state.value = state.value.filter((e)=>{
                return (e.estado!=1)
            }).map((e)=>{return {...e,estado:0}})
        },
        handleTempActivity : (state,action) =>{
            const news = state.value.map((e)=>{
                if(e.estado==0) return e
                else return action.payload
            });
            
        },
        
        saveActivity: (state) =>{
            state.value =  state.value.filter((e)=>{
                return (e.estado!=2)
            }).map((e)=> {return {...e,estado:0}})
        },
        sobrescribirTodo: (state,action)=>{
            state.value = action.payload
        },
        saveWithSobrescritura: (state) =>{
            //state.value = sobrescribir();

        },
        changeEditableActivity: (state,action)=>{
            //console.log(action.payload,"XDDD")
            
            state.value = state.value.map((e)=>{
                if(e.estado==0&& e.intervalo.indexOf(action.payload)!=-1) return {...e,estado:2}
                else return e
            })
        }

    },
    extraReducers:builder =>{
        builder
        .addCase(getIniHorario.fulfilled,(state,action)=>{
            state.value = action.payload || [];
        })
    }
})
export const {addActivity,saveActivity,
    changeEditableActivity,saveWithSobrescritura,
    sobrescribirTodo,inciarHorario,
    deleteActivity,restoreActivity} = horarioSlice.actions
export default horarioSlice.reducer