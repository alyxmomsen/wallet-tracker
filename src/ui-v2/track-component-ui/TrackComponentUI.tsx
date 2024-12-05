import React from 'react'
import { IPerson } from '../../core/person/Person'
import { UseAppContext } from '../context/UseAppContext'
import AddRequirementForm from '../add-req-form/AddRequirementForm'

const TrackComponentUI = ({ person }: { person: IPerson }) => {
    const { setCurPage } = UseAppContext()

    const transactionTypeCode = ['PLUS', 'MINUS']

    return (
        <div className="overflow">
            <h2>Track</h2>
            {person.getActualRequirementCommands().length ? (
                <div className="flex-box flex-dir-col">
                    {
                        person
                            .getWalletTrackForActualRequirements()
                            .map((elem, i) => {
                                return (
                                    <div className="bdr pdg flex-box">
                                        <div>{i + 1}.</div>
                                        <div>{elem.executionDate}</div>
                                        <div>{elem.valueBefore}</div>
                                        <div>
                                            {
                                                transactionTypeCode[
                                                    elem.transactionTypeCode
                                                ]
                                            }
                                        </div>
                                        <div>{elem.value}</div> =
                                        <div>{elem.valueAfter}</div>
                                        <button
                                            className="btn"
                                            onClick={() => {}}
                                        >
                                            execute
                                        </button>
                                    </div>
                                )
                            })
                        // [''].map(elem =><div>foobar</div>)
                    }
                </div>
            ) : (
                <div>
                    <h2>No Requirements Yet</h2>
                    <button
                        className="btn"
                        onClick={() => {
                            if (person) {
                                setCurPage(
                                    <AddRequirementForm person={person} />
                                )
                            }
                        }}
                    >
                        Add Requirement
                    </button>
                </div>
            )}
        </div>
    )
}

export default TrackComponentUI
