import { createSlice } from '@reduxjs/toolkit'

export interface level1ResetState {
    value: number
}

const initialState: level1ResetState = {
    value: 0,
}
export const level1ResetSlice = createSlice({
    name: 'level1Reset',
    initialState,
    reducers: {
        incrementLevel1Reset: (state) => {
            state.value += 1
        },
    },
})
export const { incrementLevel1Reset } = level1ResetSlice.actions
export const getLevel1Reset = (state: any) => {
    // console.log({ state })
    return state.level1Reset.value
}

export default level1ResetSlice.reducer
