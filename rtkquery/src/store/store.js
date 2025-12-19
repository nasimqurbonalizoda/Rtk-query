import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { pokemonApi } from '../services/pokeman'
import { rokemonapi } from '../services/rokemon'

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [rokemonapi.reducerPath]:rokemonapi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
  .concat(pokemonApi.middleware)
  .concat(rokemonapi.middleware),
})

setupListeners(store.dispatch)