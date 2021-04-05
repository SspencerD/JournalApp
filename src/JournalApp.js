import React from 'react'
import { Provider } from 'react-redux'


import { AppRouter } from './Routers/AppRouter'
import { store } from './store/store'

export const JournalApp = () => {

    return (

        <div>

            <Provider store={store}>
                <AppRouter />
            </Provider>

        </div>
    )
}
