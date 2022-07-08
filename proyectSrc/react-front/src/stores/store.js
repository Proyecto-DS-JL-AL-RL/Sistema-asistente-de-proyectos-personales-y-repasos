import { configureStore } from '@reduxjs/toolkit'
import horarioReducer from './sliceHorario'
import ayudaReducer from './sliceAyuda'

export default configureStore({
    reducer: {
        horario:horarioReducer,
        ayuda:ayudaReducer
    }
})