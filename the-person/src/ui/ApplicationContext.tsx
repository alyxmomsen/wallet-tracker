import React, { createContext, useContext } from 'react'

export type AppContextValue = {}

const ApplicationContext = createContext<AppContextValue | undefined>(undefined)

export const AppProvider = ({
    children,
}: {
    children: JSX.Element
}): JSX.Element => {
    return (
        <ApplicationContext.Provider value={{}}>
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
