import { createSlice } from "@reduxjs/toolkit";
import { Actividad, actividadesInfo } from "../components/horario/HorarioInfo";


/*
  estados:{
    0:pertence,
    1:temporal,
    2:editando
  }
 */


export const horarioSlice = createSlice({
    name:'horario',
    initialState:{
        value: actividadesInfo
    },
    reducers:{
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
        changeEditableActivity: (state,action)=>{
            console.log(action.payload,"XDDD")
            
            state.value = state.value.map((e)=>{
                if(e.estado==0&& e.intervalo.indexOf(action.payload)!=-1) return {...e,estado:2}
                else return e
            })
        }

    }
})
export const {addActivity,saveActivity,
    changeEditableActivity,
    deleteActivity,restoreActivity} = horarioSlice.actions
export default horarioSlice.reducer