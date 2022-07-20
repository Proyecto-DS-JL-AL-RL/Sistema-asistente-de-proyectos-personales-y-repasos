import { configureStore } from '@reduxjs/toolkit'
import horarioReducer from './sliceHorario'
import ayudaReducer from './sliceAyuda'
import configHorarioRecucer from './sliceConfigHorario'
import mensajesCortosReducer from './sliceMensajesCortos'


const store = configureStore({
    reducer: {
        horario:horarioReducer,
        ayuda:ayudaReducer,
        configHorario:configHorarioRecucer,
        mensajesCortos:mensajesCortosReducer,
    }

})

export default store;