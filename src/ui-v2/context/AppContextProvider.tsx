import React, { createContext, useEffect, useState } from 'react'
import { ApplicationSingletoneFacade } from '../../core/ApplicationFacade'
import { IPerson, OrdinaryPerson } from '../../core/person/Person'
import LoginWindowUI from '../login-window/LoginWindowUI'
import PersonCardUI from '../PersonCardUI'

export type TAppCtx = {
    app: ApplicationSingletoneFacade
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
        fetch('http://localhost:3030')
            .then((response) => {
                return response.text()
            })
            .then((data) => {
                console.log({ data })

                setLoginedPerson(new OrdinaryPerson('Alex Wellick', 0))
            })
            .finally(() => {
                console.log('fetch is done')
            })
    }, [])

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
