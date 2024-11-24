import React, { createContext, useContext } from 'react'
import { ApplicationSingletoneFacade } from '../core/ApplicationFacade'

export type AppContextValue = {
    service: ApplicationSingletoneFacade,
    update:() => void
}

const ApplicationContext = createContext<AppContextValue | undefined>(undefined)

const AppProvider = ({ children , updateCB }: { children: JSX.Element , updateCB:() => void }): JSX.Element => {
    const appService = ApplicationSingletoneFacade.Instance()

    return (
        <ApplicationContext.Provider value={{ service: appService , update:updateCB }}>
            {children}
        </ApplicationContext.Provider>
    )
}

export const UseAppContext = (): AppContextValue => {
    const ctx = useContext(ApplicationContext)

    if (ctx === undefined) {
        throw new Error('useAppContext must be used within an AppProvider')
    }

    return ctx
}

export default AppProvider
