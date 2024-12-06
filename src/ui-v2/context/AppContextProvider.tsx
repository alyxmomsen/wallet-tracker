import React, { createContext, useEffect, useState } from 'react'
import { ApplicationSingletoneFacade } from '../../core/ApplicationFacade'
import { IPerson } from '../../core/person/Person'

export type TAppCtx = {
    app: ApplicationSingletoneFacade
    loginedPerson: IPerson | null
    setLoginedPerson: (person: IPerson | null) => void
    curPage: JSX.Element
    setCurPage: (elem: JSX.Element) => void
    update: () => void
}

export const AppContext = createContext<TAppCtx | undefined>(undefined)

const AppContextProvider = ({ children }: { children: JSX.Element }) => {
    const [app, setApp] = useState<ApplicationSingletoneFacade>(
        new ApplicationSingletoneFacade()
    )
    const [loginedPerson, setLoginedPerson] = useState<IPerson | null>(null)
    const [curPage, setCurPage] = useState<JSX.Element>(
        <div>{'Login, please'.toUpperCase()}</div>
    )

    const [, update] = useState(0)

    useEffect(() => {}, [loginedPerson])

    return (
        <AppContext.Provider
            value={{
                app,
                loginedPerson,
                setLoginedPerson: (person: IPerson | null) =>
                    setLoginedPerson(person),
                curPage,
                setCurPage: (elem: JSX.Element) => setCurPage(elem),
                update: () => update((cur) => cur + 1),
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
