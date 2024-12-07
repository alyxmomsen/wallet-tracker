import React from 'react'
import { UseDateFormContext } from '../../context/AddRequirementContextProvider'

const DescriptionOptionUI = () => {
    const { description, setDescription } = UseDateFormContext()

    return (
        <div className="flex-box ">
            <div>description:</div>
            <div>
                <textarea
                    className="value-color--txt"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
        </div>
    )
}

export default DescriptionOptionUI
