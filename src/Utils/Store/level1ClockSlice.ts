import { createSlice } from '@reduxjs/toolkit'

export interface level1ClockState {
    value: number
}

const initialState: level1ClockState = {
    value: 2000,
}
export const level1ClockSlice = createSlice({
    name: 'level1Clock',
    initialState,
    reducers: {
        setLevel1Clock: (state, action) => {
            state.value = action.payload
        },
        scaleLevel1Clock: (state, action) => {
            console.log(state.value, action.payload)
            state.value = state.value - action.payload * state.value
        },
    },
})
export const { setLevel1Clock, scaleLevel1Clock } = level1ClockSlice.actions
export const getLevel1Clock = (state: any) => {
    // console.log({ state })
    return state.level1Clock.value
}

export default level1ClockSlice.reducer
