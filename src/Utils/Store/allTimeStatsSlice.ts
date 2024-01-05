import { createSlice } from '@reduxjs/toolkit'
import { level1Slice } from './level1Slice'

export interface AllTimeStatsSlice {
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

const initialState: AllTimeStatsSlice = {
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
}

export const allTimeStatsSlice = createSlice({
    name: 'allTimeStats',
    initialState,
    reducers: {
        incrementAllTimeTier: (state, action) => {
            // @ts-ignore
            state.tiers[action.payload.tier].value += action.payload.value
        },
        incrementAllTimeResets: (state, action) => {
            // @ts-ignore
            state.resets += action.payload
        },
    },
})

export const { incrementAllTimeTier, incrementAllTimeResets } = allTimeStatsSlice.actions

export const getAllTimeTier = (state: any, tier: number) => {
    return state.allTimeStats.tiers[tier].value
}

export const getAllTimeReset = (state: any) => {
    return state.allTimeStats.resets
}
export const getStartTime = (state: any) => {
    return state.allTimeStats.startTime
}
