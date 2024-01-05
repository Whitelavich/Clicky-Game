import { createSlice } from '@reduxjs/toolkit'
import { initial } from 'lodash'

export interface level1Slice {
    tiers: {
        0: { value: number }
        1: { value: number }
        2: { value: number }
        3: { value: number }
        4: { value: number }
        5: { value: number }
        6: { value: number }
        7: { value: number }
        8: { value: number }
    }
    clock: number
    resets: number
    allTimeStats: {
        startTime: number
        resets: number
        tiers: {
            0: { value: number }
            1: { value: number }
            2: { value: number }
            3: { value: number }
            4: { value: number }
            5: { value: number }
            6: { value: number }
            7: { value: number }
            8: { value: number }
        }
    }
}

const initialState: level1Slice = {
    tiers: {
        0: { value: 0 },
        1: { value: 0 },
        2: { value: 0 },
        3: { value: 0 },
        4: { value: 0 },
        5: { value: 0 },
        6: { value: 0 },
        7: { value: 0 },
        8: { value: 0 },
    },
    clock: 2000,
    resets: 0,
    allTimeStats: {
        startTime: Date.now(),
        resets: 0,
        tiers: {
            0: { value: 0 },
            1: { value: 0 },
            2: { value: 0 },
            3: { value: 0 },
            4: { value: 0 },
            5: { value: 0 },
            6: { value: 0 },
            7: { value: 0 },
            8: { value: 0 },
        },
    },
}

export const level1Slice = createSlice({
    name: 'level1',
    initialState,
    reducers: {
        setTier: (state, action) => {
            // @ts-ignore
            state.tiers[action.payload.tier].value = action.payload.value
        },

        setResets: (state, action) => {
            // @ts-ignore
            state.resets = action.payload
        },
        setClock: (state, action) => {
            // @ts-ignore
            state.clock = action.payload
        },
    },
})
export const { setTier, setResets, setClock } = level1Slice.actions

export const getTier = (state: any, tier: number) => {
    return state.level1.tiers[tier].value
}

export const getReset = (state: any) => {
    return state.level1.resets
}

export const getClock = (state: any) => {
    return state.level1.clock
}

export default level1Slice.reducer
