import React, { useEffect, useState } from 'react'
import { IPerson } from '../core/person/Person'
import { UseAppContext } from './context/UseAppContext'
import RequirementUI from './requirement-ui/RequirementUI'
import AddRequirementForm from './add-req-form/AddRequirementFormWindow'
import {
    AwakenStatusFactory,
    PersonStatusFactory,
    SlepStatusFactory,
} from '../core/person/PersonStatus'
import GoPersonButton from './shared/GoPersonButtonUI'
import TrackComponentUI from './track-component-ui/TrackComponentUI'

const PersonCardUI = ({ person }: { person: IPerson }) => {
    const { curentWindow: curPage, setCurentWindow, update } = UseAppContext()

    let actualReqs = person.getActualRequirementCommands()
    const exec = person.getExecutedRequirementCommands()

    const [actReqs, setAR] = useState(actualReqs)

    const [updated, setUpdated] = useState(0)

    const [statusStarted, setStatusStarted] = useState(0)

    let reqanfrid = 0

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
                        {person
                            .getActualRequirementCommands()
                            .map((requirement, i) => {
                                const execDate = requirement.getExecutionDate()

                                return (
                                    <div
                                        onClick={() => {
                                            setCurentWindow(
                                                <RequirementUI
                                                    requirement={requirement}
                                                    person={person}
                                                    key={i}
                                                />
                                            )
                                        }}
                                        className={
                                            'bdr pdg btn  hover--parent flex-box flex-dir-col' +
                                            (requirement.checkIfExecuted()
                                                ? ' requirement--executed'
                                                : '')
                                        }
                                    >
                                        <div className="flex-box flex-dir-col flex-center">
                                            <div>
                                                {' '}
                                                == {requirement.getTitle()} =={' '}
                                            </div>
                                            {/* <div>
                                                = {requirement.getDescription()}{' '}
                                                =
                                            </div> */}
                                            <div className="flex-box">
                                                <div className="value-color--txt flex-item">
                                                    {
                                                        [' ADD ', ' REMOVE '][
                                                            requirement.getTransactionTypeCode()
                                                        ]
                                                    }
                                                </div>
                                                <div className="flex-item">
                                                    :
                                                </div>
                                                <div className="value-color--txt flex-item">
                                                    {requirement.getValue()}
                                                </div>
                                            </div>
                                            <div className="flex-box">
                                                <div>{execDate.getDate()}</div>
                                                <div>
                                                    {execDate.getMonth() + 1}
                                                </div>
                                                <div>
                                                    {execDate.getFullYear()}
                                                </div>
                                            </div>
                                        </div>
                                        {!requirement.checkIfExecuted() ? (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    requirement.execute(person)
                                                    update()
                                                }}
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
