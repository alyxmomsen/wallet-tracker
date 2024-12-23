import React, { createContext, useEffect, useState } from 'react'

import { IPerson, OrdinaryPerson } from '../../core/person/Person'
import LoginWindowUI from '../login-window/LoginWindowUI'
import PersonCardUI, { ServerBaseURL } from '../user-card/PersonCardUI'
import { TFetchResponse, TFetchUserData } from '../login-window/RegistrationUI'
import { LocalStorageManagementService } from '../../core/services/local-storage-service'
import {
    ApplicationSingletoneFacade,
    IApplicationSingletoneFacade,
} from '../../core/App-facade'
import { ServerConnector } from '../../core/services/server-connector-service-facade'
import { EventService } from '../../core/events/App-event'
import PersonIsUpdatedPopUpWindow from '../pop-up-windows/Modal-window'
import { UseAppContext } from './UseAppContext'
import PopUpFrame from '../pop-up-windows/PopUpFrame'
import {
    IPopUpService,
    PopUpElement,
    PopUpService,
} from '../services/PopUpServise'

const cashFlowApp = new ApplicationSingletoneFacade(
    new LocalStorageManagementService(),
    new ServerConnector(),
    new EventService()
)

const popUpService = new PopUpService()

/* export interface IPopUpItem {
    exec(): JSX.Element
} */

/* export class PopUpItem implements IPopUpItem {
    private elem: () => JSX.Element

    exec(): JSX.Element {
        return this.elem()
    }

    constructor(elem: () => JSX.Element) {
        this.elem = elem
    }
} */

export type TAppCtx = {
    app: IApplicationSingletoneFacade
    loginedPerson: IPerson | null
    setUser: (person: IPerson | null) => void
    curentWindow: JSX.Element
    setCurentWindow: (elem: JSX.Element) => void
    popUpWindow: JSX.Element | null
    setPopUpWindow: (elem: JSX.Element | null) => any
    update: () => void
    // popUpItems: Map<number, PopUpItem>
    popUpService: IPopUpService
}

export const AppContext = createContext<TAppCtx | undefined>(undefined)

const AppContextProvider = ({ children }: { children: JSX.Element }) => {

    const [popUp, setPopUp] = useState<JSX.Element | null>(null)
    const [app] = useState<ApplicationSingletoneFacade>(cashFlowApp)
    const [loginedUser, setLoginedUser] = useState<IPerson | null>(null)
    const [curentWindow, setCurrentWindow] = useState<JSX.Element>(
        <StartWindow />
    )
    // const [popUpItems, setPopUpItems] = useState<Map<number, PopUpItem>>(
    //     new Map()
    // )

    const [popUpPool, setPopUpPool] = useState<JSX.Element[]>(
        popUpService.getElems()
    )

    let timeOutId: NodeJS.Timeout | null = null

    useEffect(() => {
        app.onAppUpdated(() => {
            if (timeOutId) clearTimeout(timeOutId)
            const user = app.getLocalUser()
            if (user === null) return
            // setPopUp(<OnAuthorizedPopUp timeOutId={timeOutId} />)
            // setCurrentWindow(<PersonCardUI person={user} />)
        })

        app.onUserIsSet((user: IPerson) => {
            if (timeOutId) {
                clearTimeout(timeOutId)
            }
            timeOutId = setTimeout(() => setPopUp(null), 3000)
            setLoginedUser(user)
            popUpService.addNotification(
                <PersonIsUpdatedPopUpWindow timeoutId={timeOutId} />
            )
            // setPopUp(<PersonIsUpdatedPopUpWindow timeoutId={timeOutId} />)
        })

        app.onUserIsUnset(() => {
            // setPopUp(<div>hello world</div>)
        })

        popUpService.onUpdated(() => setPopUpPool(popUpService.getElems()))

        return () => {
            if (timeOutId) {
                clearTimeout(timeOutId)
            }
        }
    }, [app])

    return (
        <AppContext.Provider
            value={{
                app,
                loginedPerson: loginedUser,
                setUser: setLoginedUser,
                curentWindow,
                setCurentWindow: (elem: JSX.Element) => setCurrentWindow(elem),
                update: () => {},
                popUpWindow: null,
                setPopUpWindow: (elem: JSX.Element | null) => setPopUp(elem),
                // popUpItems,
                popUpService,
            }}
        >
            {children}
            <div>{popUp}</div>
            {popUpPool.length && (
                <PopUpFrame>
                    <>
                        {popUpPool}
                        <div>
                            <button
                                onClick={() =>
                                    popUpService.addNotification(
                                        <div className="btn bdg">
                                            hello guy , click me, please
                                        </div>
                                    )
                                }
                            >
                                push
                            </button>
                        </div>
                    </>
                </PopUpFrame>
            )}
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

export function StartWindow(): JSX.Element {
    const { setCurentWindow, loginedPerson } = UseAppContext()

    return (
        <div className="flex-box flex-center vh vw anim--faidIn">
            <div className="flex-item">
                <button
                    onClick={() => {
                        setCurentWindow(<LoginWindowUI />)
                    }}
                    className="btn"
                >
                    {'Login / Auth'.toUpperCase()}
                </button>
            </div>
            {loginedPerson && (
                <div className="flex-item">
                    <button
                        style={{
                            backgroundColor: '#BF9748',
                            color: '#2B7272',
                            borderColor: '',
                        }}
                        onClick={() => {
                            setCurentWindow(
                                <PersonCardUI person={loginedPerson} />
                            )
                        }}
                        className="btn"
                    >
                        {`go to person card`}
                    </button>
                </div>
            )}
        </div>
    )
}
