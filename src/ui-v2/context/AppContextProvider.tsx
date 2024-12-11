import React, { createContext, useEffect, useState } from 'react'
import {
    ApplicationSingletoneFacade,
    IApplicationSingletoneFacade,
} from '../../core/ApplicationFacade'
import { IPerson, OrdinaryPerson } from '../../core/person/Person'
import LoginWindowUI from '../login-window/LoginWindowUI'
import PersonCardUI from '../PersonCardUI'
import AuthorizationUI, { authRequest } from '../login-window/AuthorizationUI'

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
    const [authChecking, setAuthChecking] = useState(false)

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
        } else {
            setCurPage(<LoginWindowUI />)
        }
    }, [loginedPerson])

    useEffect(() => {
        if (authChecking) {
            setCurPage(<div>auth...</div>)
        }
    }, [authChecking])

    useEffect(() => {
        const userId = localStorage.getItem('userId')

        if (userId !== null) {
            setAuthChecking(true)

            fetch('http://localhost:3030/get-user', {
                headers: {
                    'x-auth': userId,
                    'Content-Type': 'Application/json',
                },
                method: 'post',
            })
                .then((response) => {
                    return response.json()
                    // console.log({response});
                })
                .then((data) => {
                    setLoginedPerson(
                        new OrdinaryPerson(data.payload, 0, data.userId)
                    )
                    console.log({
                        data,
                    })
                }) /* .catch(e => console.error(e)) */
        }
    }, [])

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
