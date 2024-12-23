import React, { useEffect, useState } from 'react'
import { IPerson } from '../../core/person/Person'
import { UseAppContext } from '../context/UseAppContext'
import AddRequirementForm from '../add-req-form/AddRequirementFormWindow'
import {
    AwakenStatusFactory,
    PersonStatusFactory,
    SlepStatusFactory,
} from '../../core/person/PersonStatus'
import TrackComponentUI from '../track-component-ui/TrackComponentUI'
import LoginWindowUI from '../login-window/LoginWindowUI'
import {
    TFetchResponse,
    TUserRequirementStats as TUserRequirementStats,
} from '../login-window/RegistrationUI'
import { RequirementFactory } from '../../core/requirement-command/factories/RequirementFactory'
import { IRequirementStats } from '../../core/requirement-command/interfaces'
import { IUserData } from '../../core/types/common'
import { application } from 'express'
import { IRequirementCommand } from '../../core/requirement-command/RequirementCommand'
import RequirementModule from './modules/requirements-module/RequirementsModule'

// http://94.241.139.88:3000/
// export const ServerBaseURL = 'http://94.241.139.88:3030'
export const ServerBaseURL = 'http://127.0.0.1:3030'

const PersonCardUI = ({ person }: { person: IPerson }) => {
    const {
        curentWindow: curPage,
        setCurentWindow,
        update,
        app,
    } = UseAppContext()

    const [user, setUser] = useState<IPerson | null>(null)

    const [updated, setUpdated] = useState(0)

    const [statusStarted, setStatusStarted] = useState(0)

    const [requirements, setRequirements] = useState<IRequirementCommand[]>([])

    let reqanfrid = 0

    useEffect(() => {
        const user = app.getLocalUser()

        if (user) {
            setUser(user)
            setRequirements(user.getAllReauirementCommands())
        } else {
            setCurentWindow(<LoginWindowUI />)
        }

        console.log('>>> person card :: ', user)
    }, [])

    useEffect(() => {
        ;(() => {
            const r = () => {
                const now = Date.now()

                const updatedDiff = now - updated
                const statusAgeValue = now - statusStarted
                //
                if (statusAgeValue > 1000 * 60) {
                    if (updatedDiff >= 1000 * 60) {
                        setUpdated(now)
                        //
                    }
                } else {
                    if (updatedDiff >= 1000) {
                        setUpdated(now)
                        //
                    }
                }

                reqanfrid = window.requestAnimationFrame(r)
            }

            r()
        })()

        return () => {
            window.cancelAnimationFrame(reqanfrid)
        }
    }, [updated, statusStarted])

    const [sleepingStatusFactories, setSleepingStatusFactories] = useState<
        PersonStatusFactory[]
    >(
        (() => {
            const factory1 = new AwakenStatusFactory()
            const factory2 = new SlepStatusFactory()
            factory1.addLinkFactory(factory2)
            factory2.addLinkFactory(factory1)
            return [factory1, factory2]
        })()
    )

    const [currentStatusFactory, setCurrentStatusFactory] =
        useState<PersonStatusFactory | null>(null)

    return (
        <div className="flex-box flex-dir-col">
            <h2>PersonCardUI</h2>
            <div>
                <button
                    className="btn"
                    onClick={() => {
                        if (app.userLogout()) setCurentWindow(<LoginWindowUI />)
                    }}
                >
                    log out
                </button>
            </div>
            <div className="flex-box flex-dir-col bdr pdg">
                <h3>{user?.getName()}</h3>
                <div>
                    <div className="flex-box">
                        <span>Wallet: </span>
                        <span className="value-color--txt">
                            {user?.getWalletBalance()}
                        </span>
                    </div>
                </div>
                <div className="bdr pdg flex-box flex-item">
                    {currentStatusFactory
                        ? currentStatusFactory.getLinks().map((link) => {
                              return (
                                  <button
                                      className="btn"
                                      onClick={() => {
                                          setCurrentStatusFactory(link)
                                          const instance =
                                              currentStatusFactory.instance()
                                          person.setStatus(instance)
                                          setStatusStarted(instance.getDate())
                                          update()
                                      }}
                                  >
                                      {link.getTitle()}
                                  </button>
                              )
                          })
                        : sleepingStatusFactories.map((sleepStatusfactory) => {
                              return (
                                  <div className=" flex-item">
                                      <button
                                          className="btn"
                                          onClick={() => {
                                              const instance =
                                                  sleepStatusfactory.instance()
                                              person.setStatus(instance)
                                              setCurrentStatusFactory(
                                                  sleepStatusfactory
                                              )
                                              setStatusStarted(
                                                  instance.getDate()
                                              )
                                              update()
                                          }}
                                      >
                                          {sleepStatusfactory.getTitle()}
                                      </button>
                                  </div>
                              )
                          })}
                </div>
                <div>{user?.getStatusDescription()}</div>
                <div className="flex-box flex-dir-col">
                    <h3>{'REQUIREMENTS:'}</h3>

                    <div className="flex-box">
                        <div>
                            <button
                                className="btn"
                                onClick={() => {
                                    if (person) {
                                        setCurentWindow(
                                            <AddRequirementForm
                                                person={person}
                                            />
                                        )
                                    }
                                }}
                            >
                                ADD REQUIREMENT
                            </button>
                        </div>
                        <div>
                            <button
                                className="btn"
                                onClick={() => {
                                    setCurentWindow(
                                        <TrackComponentUI person={person} />
                                    )
                                }}
                            >
                                GO the FLOW
                            </button>
                        </div>
                    </div>
                    {requirements && requirements.length ? (
                        <RequirementModule requirements={requirements} />
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default PersonCardUI

// export async function checkUserAuth(userId: string) {
//     try {
//         const response = await fetch(
//             ServerBaseURL + '/get-user-requirements-protected',
//             {
//                 headers: {
//                     // 'content-type': 'application/json',
//                     'Content-Type': 'Application/json',
//                     'x-auth': userId,
//                 },
//                 method: 'post',
//             }
//         )

//         return response.json() as Promise<
//             TFetchResponse<TUserRequirementStats[]>
//         >
//     } catch (e) {}
// }

// export async function fetchUserRequirements(
//     userId: string
// ): Promise<TFetchResponse<IRequirementStats[]>> {
//     try {
//         const response = await fetch(
//             ServerBaseURL + '/get-user-requirements-protected',
//             {
//                 headers: {
//                     // 'content-type': 'application/json',
//                     'Content-Type': 'Application/json',
//                     'x-auth': userId,
//                 },
//                 method: 'post',
//             }
//         )

//         return response.json() as Promise<TFetchResponse<IRequirementStats[]>>
//     } catch (e) {
//         return {
//             payload: null,
//             status: {
//                 code: 1,
//                 details: 'fetch error',
//             },
//         }
//     }
// }
