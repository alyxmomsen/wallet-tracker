import React, { useEffect, useState } from 'react'
import { UseDateFormContext } from '../../context/AddRequirementContextProvider'

const TitleOptionUI = () => {
    const { title, setTitle, setDescription, setDirection, direction } =
        UseDateFormContext()

    useEffect(() => {
        setTitle(direction === 'increment' ? 'ADD' : 'REMOVE')
        setDescription(
            'Ordinary' +
                (direction === 'increment'
                    ? ' incoming flow'
                    : ' outgoing flow')
        )
    }, [direction])

    return (
        <div className="flex-box flex-item flex-center bdr pdg">
            <div>title:</div>
            <div>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="value-color--txt"
                />
            </div>
        </div>
    )
}

export default TitleOptionUI
