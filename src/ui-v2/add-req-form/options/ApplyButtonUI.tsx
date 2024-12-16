import React from 'react'
import { UseAppContext } from '../../context/UseAppContext'
import {
    DecrementMoneyRequirementCommand,
    IncrementMoneyRequirementCommand,
} from '../../../core/requirement-command/RequirementCommand'

import { UseDateFormContext } from '../../context/AddRequirementContextProvider'

const ApplyButtonUI = () => {
    const { user: currentPerson , app } = UseAppContext()

    const {  } = UseDateFormContext();

    return (
        <div className="flex-box">
            <button
                className="btn"
                onClick={() => {
                    
                }}
            >
                Apply
            </button>
        </div>
    )
}

export default ApplyButtonUI
