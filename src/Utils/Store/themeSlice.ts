import { createSlice } from '@reduxjs/toolkit'

export interface theme {
    value: string
}

const initialState: theme = {
    value: 'Default',
}
export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.value = action.payload
        },
    },
})
export const { setTheme } = themeSlice.actions
export const getTheme = (state: any) => {
    // console.log({ state })
    return state.theme.value
}

export default themeSlice.reducer
