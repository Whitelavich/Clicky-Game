import { configureStore } from '@reduxjs/toolkit'
import { level1ClockSlice } from './level1ClockSlice'
import { tier0Slice } from './tier0Slice'
import { level1ResetSlice } from './level1ResetSlice'
import { themeSlice } from './themeSlice'

export default configureStore({
    reducer: {
        level1Clock: level1ClockSlice.reducer,
        tier0: tier0Slice.reducer,
        level1Reset: level1ResetSlice.reducer,
        theme: themeSlice.reducer,
    },
})
