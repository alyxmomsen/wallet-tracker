import React, { useState } from 'react'
import { UseDateFormContext } from '../../context/AddRequirementContextProvider'

const TitleOptionUI = () => {
    const { title, setTitle } = UseDateFormContext()

    return (
        <div className="flex-box margin-auto">
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
