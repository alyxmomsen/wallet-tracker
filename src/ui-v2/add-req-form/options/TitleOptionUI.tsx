import React, { useState } from 'react'
import { UseDateFormContext } from '../../context/AddRequirementContextProvider'

const TitleOptionUI = () => {
    const { title, setTitle } = UseDateFormContext()

    return (
        <div className="flex-box flex-item flex-center bdr pdg">
            <div>title:</div>
            <div>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
        </div>
    )
}

export default TitleOptionUI
