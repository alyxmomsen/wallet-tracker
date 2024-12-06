import React from 'react'
import { UseAppContext } from '../../context/UseAppContext'
import {
    DecrementMoneyRequirementCommand,
    IncrementMoneyRequirementCommand,
} from '../../../core/RequirementCommand'

import { UseDateFormContext } from '../../context/AddRequirementContextProvider'

const ApplyButtonUI = () => {
    const { app, loginedPerson: currentPerson, update } = UseAppContext()

    const {
        title,
        value,
        setValue,
        direction,
        dateObj,
        description,
        setIsRequirementAddedSuccessfully,
        setIsNewRequirementBeingWritten,
    } = UseDateFormContext()

    return (
        <div className="flex-box">
            <button
                className="btn"
                onClick={() => {
                    if (currentPerson) {
                        const newReq =
                            direction === 'increment'
                                ? new IncrementMoneyRequirementCommand(
                                      value,
                                      title,
                                      description,
                                      dateObj
                                  )
                                : new DecrementMoneyRequirementCommand(
                                      value,
                                      title,
                                      description,
                                      dateObj
                                  )

                        console.log({ newReq })

                        currentPerson.addRequirementCommand(newReq)
                        setIsRequirementAddedSuccessfully(true)
                        setIsNewRequirementBeingWritten(false)
                        update()
                    }
                }}
            >
                Apply
            </button>
        </div>
    )
}

export default ApplyButtonUI
