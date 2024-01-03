import React from 'react'
import './App.css'
import { NextUIProvider } from '@nextui-org/react'
import Home from './Screens/Home'
import { Provider } from 'react-redux'
import GlobalStore from './Utils/Store/GlobalStore'

function App() {
    return (
        <Provider store={GlobalStore}>
            <NextUIProvider className="text-foreground bg-background ">
                <Home />
            </NextUIProvider>
        </Provider>
    )
}

export default App
