import React, { useState } from 'react'
import { UseDateFormContext } from '../../context/AddRequirementContextProvider'

const ValueOptionUI = () => {
    const { value, setValue } = UseDateFormContext()

    return (
        <div className="flex-box ">
            <div>value:</div>
            <div>
                <input
                    type="number"
                    value={value}
                    onChange={(e) =>
                        setValue(Number.parseFloat(e.target.value))
                    }
                />
            </div>
        </div>
    )
}

export default ValueOptionUI
