import React from 'react'
import { IPerson } from '../../core/person/Person'
import { UseAppContext } from '../context/UseAppContext'
import AddRequirementForm from '../add-req-form/AddRequirementFormWindow'

const TrackComponentUI = ({ person }: { person: IPerson }) => {
    const { setCurentWindow: setCurPage } = UseAppContext()

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
                                const unixTime = elem.executionDate

                                const dateObj = new Date(unixTime)

                                const date = dateObj.getDate()
                                const month = dateObj.getMonth()
                                const year = dateObj.getFullYear()

                                return (
                                    <div className="bdr pdg flex-box">
                                        <div className={`pdg`}>{i + 1}.</div>
                                        <div className="flex-box no-gap-flex bdr pdg">
                                            <span>{date}</span>
                                            <div>-</div>
                                            <span>{month}</span>
                                            <div>-</div>
                                            <span>{year}</span>
                                        </div>
                                        <div className={`bdr pdg`}>
                                            {elem.valueBefore}
                                        </div>
                                        <div className={` pdg`}>
                                            {
                                                transactionTypeCode[
                                                    elem.transactionTypeCode
                                                ]
                                            }
                                        </div>
                                        <div className={`bdr pdg`}>
                                            {elem.value}
                                        </div>{' '}
                                        =
                                        <div className={`bdr pdg`}>
                                            {elem.valueAfter}
                                        </div>
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
