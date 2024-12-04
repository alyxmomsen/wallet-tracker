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
            <div></div>

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

export function trackWalletChanges(
    requirements: IRequirement[],
    person: IPerson
): TValues[] {
    const balance = person.getWalletBalance()

    return requirements.map((req) => {
        const dateObj = req.getDateObj()
        const date = dateObj.getDate()
        const month = dateObj.getMonth() + 1
        const year = dateObj.getFullYear()

        return {
            date,
            month,
            year,
            values: {
                balanceAfter: 0,
                balanceBefore: 0,
                value: 0,
            },
        }
    })
}
