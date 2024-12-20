import React, { useEffect, useMemo, useState } from 'react'
import { IRequirementCommand } from '../../../../core/requirement-command/RequirementCommand'
import RegularRequirementItem from './Regular-requirement-item'

const RequirementModule = ({
    requirements,
}: {
    requirements: IRequirementCommand[]
}) => {
    const length = useMemo(() => {
        return requirements.length
    }, [requirements])

    const [fullReqSize, setFullReqSize] = useState(length > 3)

    useEffect(() => {
        console.log(``)
    }, [length])

    return (
        <div className="flex-box flex-dir-col">
            {requirements.map((requirement, i) => {
                const execDate = requirement.getExecutionDate()

                return fullReqSize ? (
                    <RegularRequirementItem requirement={requirement} />
                ) : (
                    <MinimalisticRequirement requirement={requirement} />
                )
            })}
        </div>
    )
}

export default RequirementModule

const MinimalisticRequirement = ({
    requirement,
}: {
    requirement: IRequirementCommand
}) => {
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
                (requirement.checkIfExecuted() ? ' requirement--executed' : '')
            }
        >
            <div className="flex-box flex-dir-col flex-center">
                <div> == {requirement.getTitle()} == </div>
                {/* <div>
                                                = {requirement.getDescription()}{' '}
                                                =
                                            </div> */}
                <div className="flex-box">
                    <div className="value-color--txt flex-item">
                        {[' - ', ' + '][requirement.getTransactionTypeCode()]}
                    </div>
                    <div className="flex-item">:</div>
                    <div className="value-color--txt flex-item">
                        {requirement.getValue()}
                    </div>
                </div>
                <div className="flex-box">
                    {/* <div>{execDate}</div>
                                <div>{execDate}</div>
                                <div>{execDate}</div> */}
                </div>
            </div>
            {!requirement.checkIfExecuted() ? (
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
}
