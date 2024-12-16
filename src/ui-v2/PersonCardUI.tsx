import React, { useEffect, useState } from 'react'
import { IPerson } from '../core/person/Person'
import { UseAppContext } from './context/UseAppContext'
import AddRequirementForm from './add-req-form/AddRequirementFormWindow'
import {
    AwakenStatusFactory,
    PersonStatusFactory,
    SlepStatusFactory,
} from '../core/person/PersonStatus'
import TrackComponentUI from './track-component-ui/TrackComponentUI'
import LoginWindowUI from './login-window/LoginWindowUI'
import {
    TFetchResponse,
    TFetchUserRequirementStats,
} from './login-window/RegistrationUI'
import { RequirementFactory } from '../core/requirement-command/factories/RequirementFactory'

// export const ServerBaseURL = 'http://94.241.139.88:3030';
export const ServerBaseURL = 'http://127.0.0.1:3030'

const PersonCardUI = ({ person }: { person: IPerson }) => {
    console.log('person card ui')
    const {
        curentWindow: curPage,
        setCurentWindow,
        update,
        setUser,
    } = UseAppContext()

    const [updated, setUpdated] = useState(0)

    const [statusStarted, setStatusStarted] = useState(0)

    const [requirements, setRequirements] = useState<
        TFetchUserRequirementStats[]
    >([])

    let reqanfrid = 0

    useEffect(() => {
        console.log('person card init effect')
        const userId = localStorage.getItem('userId')
        if (userId === null) {
            alert('no token')
            setCurentWindow(<LoginWindowUI />)
            return
        }

        fetchUserRequirements(userId).then((data) => {
            if (data.payload === null) {
                return
            }

            const requirementFactory = new RequirementFactory()

            data.payload.forEach((requirementsStatsItem) => {
                // console.log('data payload' , person , data.payload);

                const {
                    id,
                    value,
                    title,
                    date,
                    description,
                    isExecuted,
                    transactionTypeCode,
                } = requirementsStatsItem

                if (person.getRequirementCommandById(id).length) {
                    return
                }

                const newRequirement = requirementFactory.create(
                    id,
                    value,
                    title,
                    description,
                    date,
                    transactionTypeCode
                )

                if (newRequirement) {
                    console.log('add requirment')

                    person.addRequirementCommand(newRequirement)
                }
            })

            const actualRequirements = person
                .getAllReauirementCommands()
                .map((requirement) => {
                    const isExecuted = requirement.checkIfExecuted()
                    const description = requirement.getDescription()
                    const title = requirement.getTitle()
                    const transactionTypeCode =
                        requirement.getTransactionTypeCode()
                    const value = requirement.getValue()
                    const date = requirement.getExecutionDate()
                    const id = requirement.getId()

                    const requiremntFilds: TFetchUserRequirementStats = {
                        id,
                        date,
                        description,
                        isExecuted,
                        title,
                        transactionTypeCode,
                        value,
                    }

                    return requiremntFilds
                })

            setRequirements(actualRequirements)
        })

        // 'get-user-requirements-protected'
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
                        console.log('time updated')
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
                        localStorage.removeItem('userId')
                        setUser(null)
                        setCurentWindow(<LoginWindowUI />)
                    }}
                >
                    log out
                </button>
            </div>
            <div className="flex-box flex-dir-col bdr pdg">
                <h3>{person.getName()}</h3>
                <div>
                    <div className="flex-box">
                        <span>Wallet: </span>
                        <span className="value-color--txt">
                            {person.getWalletBalance()}
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
                <div>{person.getStatusDescription()}</div>
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
                    <div className="flex-box">
                        {requirements.map((requirement, i) => {
                            const execDate = requirement.date

                            return (
                                <div
                                    onClick={() => {
                                        // setCurentWindow(
                                        //     <RequirementUI
                                        //         requirement={requirement}
                                        //         person={person}
                                        //         key={i}
                                        //     />
                                        // )
                                    }}
                                    className={
                                        'bdr pdg btn  hover--parent flex-box flex-dir-col' +
                                        (requirement.isExecuted
                                            ? ' requirement--executed'
                                            : '')
                                    }
                                >
                                    <div className="flex-box flex-dir-col flex-center">
                                        <div> == {requirement.title} == </div>
                                        {/* <div>
                                                = {requirement.getDescription()}{' '}
                                                =
                                            </div> */}
                                        <div className="flex-box">
                                            <div className="value-color--txt flex-item">
                                                {
                                                    [' ADD ', ' REMOVE '][
                                                        requirement
                                                            .transactionTypeCode
                                                    ]
                                                }
                                            </div>
                                            <div className="flex-item">:</div>
                                            <div className="value-color--txt flex-item">
                                                {requirement.value}
                                            </div>
                                        </div>
                                        <div className="flex-box">
                                            <div>{execDate}</div>
                                            <div>{execDate}</div>
                                            <div>{execDate}</div>
                                        </div>
                                    </div>
                                    {!requirement.isExecuted ? (
                                        <button
                                            // onClick={(e) => {
                                            //     e.stopPropagation()
                                            //     requirement.execute(person)
                                            //     update()
                                            // }}
                                            className="hover--child btn"
                                        >
                                            execute
                                        </button>
                                    ) : null}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonCardUI

export async function checkUserAuth(userId: string) {
    try {
        const response = await fetch(
            ServerBaseURL + '/get-user-requirements-protected',
            {
                headers: {
                    // 'content-type': 'application/json',
                    'Content-Type': 'Application/json',
                    'x-auth': userId,
                },
                method: 'post',
            }
        )

        return response.json() as Promise<
            TFetchResponse<TFetchUserRequirementStats[]>
        >
    } catch (e) {}
}

export async function fetchUserRequirements(
    userId: string
): Promise<TFetchResponse<TFetchUserRequirementStats[]>> {
    try {
        const response = await fetch(
            ServerBaseURL + '/get-user-requirements-protected',
            {
                headers: {
                    // 'content-type': 'application/json',
                    'Content-Type': 'Application/json',
                    'x-auth': userId,
                },
                method: 'post',
            }
        )

        return response.json() as Promise<
            TFetchResponse<TFetchUserRequirementStats[]>
        >
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
