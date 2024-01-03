import React from 'react'
import './App.css'
import { NextUIProvider } from '@nextui-org/react'
import Home from './Screens/Home'
import { Provider } from 'react-redux'
import { persistor, store } from './Utils/Store/GlobalStore'
import { PersistGate } from 'redux-persist/integration/react'

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NextUIProvider className="text-foreground bg-background ">
                    <Home />
                </NextUIProvider>
            </PersistGate>
        </Provider>
    )
}

export default App
