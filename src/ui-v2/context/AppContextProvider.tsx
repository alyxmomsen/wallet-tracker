import React, { createContext, useEffect, useState } from 'react'
import {
    ApplicationSingletoneFacade,
    IApplicationSingletoneFacade,
} from '../../core/ApplicationFacade'
import { IPerson, OrdinaryPerson } from '../../core/person/Person'
import LoginWindowUI from '../login-window/LoginWindowUI'
import PersonCardUI from '../PersonCardUI'

export type TAppCtx = {
    app: IApplicationSingletoneFacade
    loginedPerson: IPerson | null
    setLoginedPerson: (person: IPerson | null) => void
    curentWindow: JSX.Element
    setCurentWindow: (elem: JSX.Element) => void
    update: () => void
}

export const AppContext = createContext<TAppCtx | undefined>(undefined)

const AppContextProvider = ({ children }: { children: JSX.Element }) => {
    const [app] = useState<ApplicationSingletoneFacade>(
        new ApplicationSingletoneFacade()
    )
    const [loginedPerson, setLoginedPerson] = useState<IPerson | null>(null)
    const [curPage, setCurPage] = useState<JSX.Element>(
        <div className="flex-box flex-center vh vw">
            <div className="flex-item">
                <button
                    onClick={() => {
                        setCurPage(<LoginWindowUI />)
                    }}
                    className="btn"
                >
                    {'Login, please'.toUpperCase()}
                </button>
            </div>
        </div>
    )

    const [s, update] = useState(0)

    useEffect(() => {
        if (loginedPerson) {
            setCurPage(<PersonCardUI person={loginedPerson} />)
        }
    }, [loginedPerson])

    return (
        <AppContext.Provider
            value={{
                app,
                loginedPerson,
                setLoginedPerson,
                curentWindow: curPage,
                setCurentWindow: (elem: JSX.Element) => setCurPage(elem),
                update: () => update((cur) => cur + 1),
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
