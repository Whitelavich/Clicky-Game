import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { themeSlice } from './themeSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { level1Slice } from './level1Slice'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { allTimeStatsSlice } from './allTimeStatsSlice'

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
}

const allReducers = combineReducers({
    theme: themeSlice.reducer,
    level1: level1Slice.reducer,
    allTimeStats: allTimeStatsSlice.reducer,
})

const rootReducer = (state: any, action: any) => {
    if (action.type === 'RESET_APP') {
        state = undefined
    }
    return allReducers(state, action)
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
})

export const persistor = persistStore(store)
