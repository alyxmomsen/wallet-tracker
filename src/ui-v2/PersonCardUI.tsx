import React, { act, useState } from 'react'
import { IPerson } from '../core/Person'
import { IRequirement } from '../core/Requirement'

type TValues = {
    date: number
    month: number
    year: number
    values: {
        balanceBefore: number
        balanceAfter: number
        value: number
    }
}
const PersonCardUI = ({ person }: { person: IPerson }) => {
    let actualReqs = person.getActualRequirementCommands()
    const exec = person.getExecutedRequirementCommands()

    const [actReqs, setAR] = useState(actualReqs)

    return (
        <div className="">
            <h2>PersonCardUI</h2>
            <div>
                {
                    person.getWalletTrackForActualRequirements().map((elem) => {
                        return (
                            <div className="bdr pdg flex-box">
                                <div>{elem.valueBefore}</div> after
                                <div>{elem.value}</div> =
                                <div>{elem.valueAfter}</div>
                            </div>
                        )
                    })
                    // [''].map(elem =><div>foobar</div>)
                }
            </div>

            <h3>{person.getName()}</h3>
            <div>
                <div>
                    <h3>REQUIREMENTS:</h3>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default PersonCardUI
