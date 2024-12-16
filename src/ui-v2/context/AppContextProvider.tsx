import React, { createContext, useEffect, useState } from 'react'
import {
    ApplicationSingletoneFacade as ApplicationFacadeSingletone,
    IApplicationSingletoneFacade,
} from '../../core/ApplicationFacade'
import { IPerson, OrdinaryPerson } from '../../core/person/Person'
import LoginWindowUI from '../login-window/LoginWindowUI'
import PersonCardUI, { ServerBaseURL } from '../PersonCardUI'
import { TFetchResponse, TFetchUserData } from '../login-window/RegistrationUI'
import { convertToObject } from 'typescript'

const cashFlowApp = new ApplicationFacadeSingletone()

export type TAppCtx = {
    app: IApplicationSingletoneFacade
    user: IPerson | null
    setUser: (person: IPerson | null) => void
    curentWindow: JSX.Element
    setCurentWindow: (elem: JSX.Element) => void
    update: () => void
}

export const AppContext = createContext<TAppCtx | undefined>(undefined)

const AppContextProvider = ({ children }: { children: JSX.Element }) => {
    // const { app } = UseMyApp()

    console.log('app_context_provider')

    const { data: updatedTokenData, inProcess: tokenUpdatingInProcessStatus } =
        UseCheckUserToken(localStorage.getItem('userId'))

    const [app] = useState<ApplicationFacadeSingletone>(cashFlowApp)
    const [user, setUser] = useState<IPerson | null>(null)
    const [curentWindow, setCurrentWindow] = useState<JSX.Element>(
        <div className="flex-box flex-center vh vw">
            <div className="flex-item">
                <button
                    onClick={() => {
                        setCurrentWindow(<LoginWindowUI />)
                    }}
                    className="btn"
                >
                    {'Login, please'.toUpperCase()}
                </button>
            </div>
        </div>
    )

    useEffect(() => {
        const userId = localStorage.getItem('userId')

        if (userId === null) return

        const user = app.getUserData()

        if (user === null) return

        setCurrentWindow(<PersonCardUI person={user} />)

        requestUserData(userId).then((data) => {
            console.log({ data })

            const { payload, status } = data

            if (payload !== null) {
                app.setUser()
                const newUser = new OrdinaryPerson(userId, payload.userName, 0)

                setUser(newUser)
                setCurrentWindow(<PersonCardUI person={newUser} />)
            }
        })
    }, [])

    return (
        <AppContext.Provider
            value={{
                app,
                user,
                setUser,
                curentWindow,
                setCurentWindow: (elem: JSX.Element) => setCurrentWindow(elem),
                update: () => {},
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider

export async function requestUserData(
    userId: string
): Promise<TFetchResponse<TFetchUserData>> {
    try {
        const response = await fetch(ServerBaseURL + '/get-user-protected', {
            headers: {
                'x-auth': userId,
                'Content-Type': 'Application/json',
            },
            method: 'post',
        })

        const data = (await response.json()) as TFetchResponse<TFetchUserData>

        return data
    } catch (e) {
        return {
            payload: null,
            status: {
                code: 1,
                details: 'fetch error',
            },
        }
    }
}

type TUseCheckUserTokenResponseData = {
    status: {
        code: number
        details: 'token updated'
    }
    payload: {
        token: string
    } | null
}

function UseCheckUserToken(tokenString: string | null) {
    const [token, setToken] = useState<string | null>(tokenString)

    const [data, setData] = useState<TUseCheckUserTokenResponseData | null>(
        null
    )

    const [inProcess, setInProcess] = useState(false)

    useEffect(() => {
        if (token) {
            setInProcess(true)

            fetch('http://localhost:3030/check-user-auth-protected-ep', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth': token,
                },
            })
                .then((response) => {
                    return response.json() as Promise<TUseCheckUserTokenResponseData>
                })
                .then((data) => {
                    setData(data)
                    setInProcess(false)
                    console.log({ data })
                })
                .catch((e) => {
                    alert({ e })
                    setInProcess(false)
                })
                .finally(() => {})
        }
    }, [token])

    return { data, inProcess }
}

function UseMyApp() {
    console.log('use my app hook')

    const [app, setApp] = useState<ApplicationFacadeSingletone>(cashFlowApp)

    useEffect(() => {}, [app])

    return {
        app,
    }
}
