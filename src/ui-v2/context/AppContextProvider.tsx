import React, { createContext, useEffect, useState } from 'react'
import { ApplicationSingletoneFacade } from '../../core/ApplicationFacade'
import { IPerson } from '../../core/Person'
import PersonCdUi from '../../ui/PrsnCrdUI'

export type TAppCtx = {
    app: ApplicationSingletoneFacade
    currentPerson: IPerson | null
    setCurrentPerson: (person: IPerson | null) => void
    curPage: JSX.Element
    setCurPage: (elem: JSX.Element) => void
}

export const AppContext = createContext<TAppCtx | undefined>(undefined)

const AppContextProvider = ({ children }: { children: JSX.Element }) => {
    const [app, setApp] = useState<ApplicationSingletoneFacade>(
        new ApplicationSingletoneFacade()
    )
    const [currentPerson, setCurrentPerson] = useState<IPerson | null>(null)
    const [curPage, setCurPage] = useState<JSX.Element>(<div>no page</div>)

    useEffect(() => {}, [currentPerson])

    return (
        <AppContext.Provider
            value={{
                app,
                currentPerson,
                setCurrentPerson: (person: IPerson | null) =>
                    setCurrentPerson(person),
                curPage,
                setCurPage: (elem: JSX.Element) => setCurPage(elem),
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
