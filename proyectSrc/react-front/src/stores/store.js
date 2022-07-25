import { configureStore } from '@reduxjs/toolkit'
import horarioReducer from './sliceHorario'
import ayudaReducer from './sliceAyuda'
import configHorarioRecucer from './sliceConfigHorario'
import mensajesCortosReducer from './sliceMensajesCortos'
import tutorialReducer from './sliceTutorial'

const store = configureStore({
    reducer: {
        horario:horarioReducer,
        ayuda:ayudaReducer,
        configHorario:configHorarioRecucer,
        mensajesCortos:mensajesCortosReducer,
        tutoriales:tutorialReducer
    }

})

export default store;