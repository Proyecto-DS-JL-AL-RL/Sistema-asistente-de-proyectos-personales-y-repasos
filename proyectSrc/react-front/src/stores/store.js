import { configureStore } from '@reduxjs/toolkit'
import horarioReducer from './sliceHorario'
import ayudaReducer from './sliceAyuda'
import configHorarioRecucer from './sliceConfigHorario'

export default configureStore({
    reducer: {
        horario:horarioReducer,
        ayuda:ayudaReducer,
        configHorario:configHorarioRecucer
    }
})