import React from 'react'
import { IPerson } from '../../core/person/Person'
import { UseAppContext } from '../context/UseAppContext'
import AddRequirementForm from '../add-req-form/AddRequirementFormWindow'
import GoPersonButton from '../shared/GoPersonButtonUI'
import { IUserData } from '../../core/types/common'
import { IRequirementStats } from '../../core/requirement-command/interfaces'

const TrackComponentUI = ({ person }: { person: Omit<IUserData, "id"> & {
    requirements: Omit<IRequirementStats, "userId">[];
} }) => {
    const { setCurentWindow: setCurPage } = UseAppContext()

    const transactionTypeCode = ['PLUS', 'MINUS']

    return (
        <div className="overflow">
            <div className="flex-box">
                <GoPersonButton />
                <div>
                    <button
                        className="btn"
                        onClick={() => {
                            setCurPage(<AddRequirementForm />)
                        }}
                    >
                        Add Requirement
                    </button>
                </div>
            </div>
            <h2>Track</h2>
            {person.requirements.length ? (
                <div className="flex-box flex-dir-col">
                    {
                        person
                            .requirements
                            .map((elem, i) => {
                                const unixTime = elem.dateToExecute

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
                                            value befor calculate
                                        </div>
                                        <div className={` pdg`}>
                                            {
                                                transactionTypeCode[
                                                    elem.cashFlowDirectionCode
                                                ]
                                            }
                                        </div>
                                        <div className={`bdr pdg`}>
                                            {elem.value}
                                        </div>{' '}
                                        =
                                        <div className={`bdr pdg`}>
                                            {'value after'}
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
                                    <AddRequirementForm />
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
