import { createContext, useEffect, useState } from 'react'
import LoginWindowUI from '../login-window/LoginWindowUI'
import PersonCardUI from '../user-card/PersonCardUI'
import PersonIsUpdatedPopUpWindow from '../pop-up-windows/Modal-window'
import { UseAppContext } from './UseAppContext'
import PopUpFrame from '../pop-up-windows/PopUpFrame'
import { IPopUpService, PopUpService } from '../services/PopUpServise'
import {
    ILocalStorageManagementService,
    LocalStorageManagementService,
} from '../services/local-storage-service'
/* --- */
import {
    ApplicationSingletoneFacade,
    IApplicationSingletoneFacade,
} from 'cash-flow/dist/core/App-facade'
import { IUserStats } from 'cash-flow/dist/core/types/common'
import {
    IRequirementStats,
    IRrequirementsStatsType,
} from 'cash-flow/dist/core/requirement-command/interfaces'

/* --- */
const popUpService = new PopUpService()
const localstorageManagementService = new LocalStorageManagementService()
const authToken = localstorageManagementService.getAuthData()
const cashFlowApp = new ApplicationSingletoneFacade(authToken || '')

export type TAppCtx = {
    localStorageService: ILocalStorageManagementService
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
            localstorageManagementService.unsetAuthData()
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
                localStorageService: localstorageManagementService,
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
