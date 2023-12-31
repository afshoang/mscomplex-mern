import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from "redux"
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import cartReducer from './features/cartSlice';
import authReducer from './features/authSlice';
import { apiSlice } from './features/api/apiSlice';


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['auth', 'cart']
}

const rootReducer = combineReducers({ 
    auth: authReducer, 
    cart: cartReducer, 
    [apiSlice.reducerPath]: apiSlice.reducer, 
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(apiSlice.middleware),
    devTools: false
})

export let persistor = persistStore(store);