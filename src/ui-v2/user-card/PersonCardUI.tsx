import React, { useEffect, useState } from 'react'
import { UseAppContext } from '../context/UseAppContext'
import AddRequirementForm from '../add-req-form/AddRequirementFormWindow'
import TrackComponentUI from '../track-component-ui/TrackComponentUI'
import LoginWindowUI from '../login-window/LoginWindowUI'
import RequirementModule from './modules/requirements-module/RequirementsModule'
/* #warning */
import { IUserStats } from 'cash-flow/dist/core/types/common'
import { IRrequirementsStatsType } from 'cash-flow/dist/core/requirement-command/interfaces'
import {
    AwakenStatusFactory,
    PersonStatusFactory,
    SlepStatusFactory,
} from 'cash-flow/dist/core/person/PersonStatus'

const PersonCardUI = ({
    person,
}: {
    person: Omit<IUserStats, 'id' | 'password' | 'requirements'> & {
        requirements: Omit<IRrequirementsStatsType, 'userId' | 'deleted'>[]
    }
}) => {
    const {
        curentWindow: curPage,
        setCurentWindow,
        update,
        app,
        loginedPerson,
    } = UseAppContext()

    const [user, setUser] = useState<
        | (Omit<IUserStats, 'id' | 'requirements' | 'password'> & {
              requirements: Omit<
                  IRrequirementsStatsType,
                  'userId' | 'deleted'
              >[]
          })
        | null
    >(null)

    const [updated, setUpdated] = useState(0)

    const [statusStarted, setStatusStarted] = useState(0)

    const [requirements, setRequirements] = useState<
        Omit<IRrequirementsStatsType, 'userId' | 'deleted'>[]
    >([])

    let reqanfrid = 0

    useEffect(() => {
        const user = app.getUserStats()

        if (user) {
            setUser(user)
            setRequirements(user.requirements)
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
                        if (app.userLogOut()) setCurentWindow(<LoginWindowUI />)
                    }}
                >
                    log out
                </button>
            </div>
            <div className="flex-box flex-dir-col bdr pdg">
                <h3>{loginedPerson?.name}</h3>
                <div>
                    <div className="flex-box">
                        <span>Wallet: </span>
                        <span className="value-color--txt">
                            {loginedPerson?.wallet}
                        </span>
                    </div>
                </div>
                <div className="bdr pdg flex-box flex-item">
                    {currentStatusFactory
                        ? currentStatusFactory.getLinks().map((link) => {
                              return (
                                  <button className="btn" onClick={() => {}}>
                                      {link.getTitle()}
                                  </button>
                              )
                          })
                        : sleepingStatusFactories.map((sleepStatusfactory) => {
                              return (
                                  <div className=" flex-item">
                                      <button
                                          className="btn"
                                          onClick={() => {}}
                                      >
                                          {sleepStatusfactory.getTitle()}
                                      </button>
                                  </div>
                              )
                          })}
                </div>
                <div>{'status description'}</div>
                <div className="flex-box flex-dir-col">
                    <h3>{'REQUIREMENTS:'}</h3>

                    <div className="flex-box">
                        <div>
                            <button
                                className="btn"
                                onClick={() => {
                                    if (person) {
                                        setCurentWindow(<AddRequirementForm />)
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
                    {requirements && requirements.length && loginedPerson ? (
                        <RequirementModule
                            requirements={loginedPerson.requirements}
                            user={loginedPerson}
                        />
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default PersonCardUI
