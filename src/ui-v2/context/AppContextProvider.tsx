import React, { createContext, useEffect, useState } from 'react'
import LoginWindowUI from '../login-window/LoginWindowUI'
import PersonCardUI, { ServerBaseURL } from '../user-card/PersonCardUI'
import { TFetchResponse, TFetchUserData } from '../login-window/RegistrationUI'
import {
    ApplicationSingletoneFacade,
    IApplicationSingletoneFacade,
} from '../../core/App-facade'
import { HTTPServerComunicateService } from '../../core/services/server-connector-service-facade'
import { EventService } from '../../core/events/App-event'
import PersonIsUpdatedPopUpWindow from '../pop-up-windows/Modal-window'
import { UseAppContext } from './UseAppContext'
import PopUpFrame from '../pop-up-windows/PopUpFrame'
import {
    IPopUpService,
    PopUpService,
} from '../services/PopUpServise'
import { IUserStats } from '../../core/types/common'
import {
    IRequirementStats,
    IRrequirementsStatsType,
} from '../../core/requirement-command/interfaces'
import { LocalStorageManagementService } from '../services/local-storage-service'

const cashFlowApp = new ApplicationSingletoneFacade(
    new LocalStorageManagementService(),
    new HTTPServerComunicateService(),
    new EventService()
)

const popUpService = new PopUpService()

const localstorageManagementService = new LocalStorageManagementService();

export type TAppCtx = {
    app: IApplicationSingletoneFacade
    loginedPerson:
        | (Omit<IUserStats, 'id' | 'requirements' | 'password'> & {
              requirements: Omit<
                  IRrequirementsStatsType,
                  'userId' | 'deleted'
              >[]
          })
        | null
    setUser: (
        person:
            | (Omit<IUserStats, 'id'> & {
                  requirements: Omit<IRequirementStats, 'userId'>[]
              })
            | null
    ) => void
    curentWindow: JSX.Element
    setCurentWindow: (elem: JSX.Element) => void
    popUpWindow: JSX.Element | null
    setPopUpWindow: (elem: JSX.Element | null) => any
    update: () => void

    popUpService: IPopUpService
}

export const AppContext = createContext<TAppCtx | undefined>(undefined)

const AppContextProvider = ({ children }: { children: JSX.Element }) => {
    const [popUp, setPopUp] = useState<JSX.Element | null>(null)
    const [app] = useState<ApplicationSingletoneFacade>(cashFlowApp)
    const [loginedUser, setLoginedUser] = useState<
        | (Omit<IUserStats, 'id' | 'password' | 'requirements'> & {
              requirements: Omit<
                  IRrequirementsStatsType,
                  'userId' | 'deleted'
              >[]
          })
        | null
    >(null)
    const [curentWindow, setCurrentWindow] = useState<JSX.Element>(
        <StartWindow />
    )

    const [popUpPool, setPopUpPool] = useState<JSX.Element[]>(
        popUpService.getElems()
    )

    let timeOutId: NodeJS.Timeout | null = null

    useEffect(() => {
        app.subscriberOnMessage({
            callBacks: [
                () => {
                    const userStats = app.getUserStats()
                    if (userStats) {
                        setLoginedUser(userStats)
                    }
                },
            ],
            message: 'updated',
        })

        app.onAppUpdate(() => {})

        app.onUserSet(
            (
                user: Omit<IUserStats, 'id' | 'password' | 'requirements'> & {
                    requirements: Omit<
                        IRrequirementsStatsType,
                        'userId' | 'deleted'
                    >[]
                }
            ) => {
                if (timeOutId) {
                    clearTimeout(timeOutId)
                }
                timeOutId = setTimeout(() => setPopUp(null), 3000)
                setLoginedUser(user)
                popUpService.addNotification(
                    <PersonIsUpdatedPopUpWindow timeoutId={timeOutId} />
                )
                // setPopUp(<PersonIsUpdatedPopUpWindow timeoutId={timeOutId} />)
            }
        )

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
