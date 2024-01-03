import { createSlice } from '@reduxjs/toolkit'

export interface tier0State {
    value: number
}

const initialState: tier0State = {
    value: 0,
}
export const tier0Slice = createSlice({
    name: 'tier0',
    initialState,
    reducers: {
        addTier0: (state, action) => {
            state.value += action.payload
        },
        subTier0: (state, action) => {
            state.value -= action.payload
        },
        setTier0: (state, actions) => {
            state.value = actions.payload
        },
        resetTier0: (state) => {
            state.value = 0
        },
    },
})
export const { addTier0, subTier0, setTier0, resetTier0 } = tier0Slice.actions
export const getTier0 = (state: any) => {
    // console.log({ state })
    return state.tier0.value
}

export default tier0Slice.reducer
