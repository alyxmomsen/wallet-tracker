import React from 'react'
import { IPerson } from '../core/Person'
import { IRequirement } from '../core/Requirement'
import { UseAppContext } from '../ui-v2/context/UseAppContext'
type TValues = {
    date: number
    month: number
    year: number
    values: { balanceBefore: number; value: number; balanceAfter: number }[]
}
const PersonCdUi = ({ person }: { person: IPerson }) => {
    // const { modals, setModals } = UseAppCtx()

    const { currentPerson } = UseAppContext()

    const {} = UseAppContext()

    let actualReqs = person.getActualRequirements()
    const exec = person.getExecutedRequirements()

    return (
        <div className="">
            <h2>PersonCardUI</h2>
            <div>
                {trackWalletChanges(
                    10,
                    new Date(),
                    actualReqs,
                    [],
                    person.getWalletBalance()
                ).map((elem) =>
                    elem.values.map((elemen) => {
                        let str = ''

                        str += `req date: ${elem.date}`
                        str += `-${elem.month}-${elem.year}`
                        str += ` | ${elemen.balanceBefore} `
                        str += `- ${elemen.value}`
                        str += ` = ${elemen.balanceAfter}`

                        return <div>{str}</div>
                    })
                )}
            </div>
            <div>
                <button
                    onClick={() => {
                        // setModals(
                        //     modals.filter((elem) => elem !== modals.pop())
                        // )
                    }}
                >
                    close button
                </button>
            </div>
            <h3>{person.getName()}</h3>
            <div>
                <div>
                    <h3>REQUIREMENTS:</h3>
                    <div>
                        {actualReqs.map((elem) => (
                            <div>{elem.getTitle()}</div>
                        ))}
                        {exec.map((elem) => (
                            <div>{elem.getTitle()}</div>
                        ))}
                        <div>{}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonCdUi

export function trackWalletChanges(
    iterations: number,
    curDateObj: Date,
    actualRequirements: IRequirement[],
    values: TValues[],
    walletValue: number
): TValues[] {
    const date = curDateObj.getDate()
    const month = curDateObj.getMonth()
    const year = curDateObj.getFullYear()

    let requirementValueeees: {
        balanceBefore: number
        value: number
        balanceAfter: number
    }[] = []

    const newActReqs = actualRequirements.filter((requirement) => {
        const actReqDateObj = requirement.getDateObj()

        if (
            actReqDateObj.getDate() === date &&
            actReqDateObj.getMonth() === month &&
            actReqDateObj.getFullYear() === year
        ) {
            walletValue -= requirement.getValue()
            const newWalletValue = walletValue - requirement.getValue()
            requirementValueeees.push({
                value: requirement.getValue(),
                balanceAfter: newWalletValue,
                balanceBefore: walletValue,
            })

            console.log({ requirementValueeee: requirementValueeees })
            return false
        }

        return true
    })

    if (iterations - 1 > 0) {
        curDateObj.setDate(curDateObj.getDate() + 1)
        return trackWalletChanges(
            iterations - 1,
            curDateObj,
            newActReqs,
            [
                ...values,
                {
                    date,
                    month,
                    year,
                    values: requirementValueeees,
                },
            ],
            walletValue
        )
    } else {
        return [
            ...values,
            {
                date,
                month,
                year,
                values: requirementValueeees,
            },
        ]
    }
}
