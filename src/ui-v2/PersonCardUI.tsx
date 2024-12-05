import React, { useState } from 'react'
import { IPerson } from '../core/person/Person'
import { UseAppContext } from './context/UseAppContext'
import RequirementUI from './requirement-ui/RequirementUI'
import AddRequirementForm from './add-req-form/AddRequirementForm'
import {
    AwakenStatusFactory,
    PersonStatusFactory,
    SlepStatusFactory,
} from '../core/person/PersonStatus'

const PersonCardUI = ({ person }: { person: IPerson }) => {
    const { curPage, setCurPage, update } = UseAppContext()

    let actualReqs = person.getActualRequirementCommands()
    const exec = person.getExecutedRequirementCommands()

    const [actReqs, setAR] = useState(actualReqs)

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
        <div className="">
            <h2>PersonCardUI</h2>

            <h3>{person.getName()}</h3>
            <div>
                <div>
                    <h3>Wallet</h3>
                    <div>{person.getWalletBalance()}</div>
                </div>
                <div className="bdr pdg flex-box flex-item">
                    {currentStatusFactory
                        ? currentStatusFactory.getLinks().map((link) => {
                              return (
                                  <button
                                      className="btn"
                                      onClick={() => {
                                          setCurrentStatusFactory(link)
                                          person.setStatus(
                                              currentStatusFactory.instance()
                                          )
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
                                              person.setStatus(
                                                  sleepStatusfactory.instance()
                                              )
                                              setCurrentStatusFactory(
                                                  sleepStatusfactory
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
                <div>
                    <h3>
                        {person.getAllReauirementCommands().length ? (
                            'REQUIREMENTS:'
                        ) : (
                            <button
                                className="btn"
                                onClick={() => {
                                    if (person) {
                                        setCurPage(
                                            <AddRequirementForm
                                                person={person}
                                            />
                                        )
                                    }
                                }}
                            >
                                ADD REQUIREMENT
                            </button>
                        )}
                    </h3>
                    <div className="flex-box">
                        {person
                            .getActualRequirementCommands()
                            .map((requirement, i) => {
                                const d = requirement.getExecutionDate()

                                return (
                                    <div
                                        onClick={() => {
                                            setCurPage(
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
                                        <div>
                                            = {requirement.getDescription()} =
                                        </div>
                                        <div className="flex-box">
                                            <div>{d.getDate()}</div>
                                            <div>{d.getMonth() + 1}</div>
                                            <div>{d.getFullYear()}</div>
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
