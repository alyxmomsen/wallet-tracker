import React, { useEffect, useState } from 'react'
import { UseDateFormContext } from '../../context/AddRequirementContextProvider'

const TitleOptionUI = () => {
    const { title, setTitle, setDescription, transactionTypeCode } =
        UseDateFormContext()

    useEffect(() => {
        setTitle(transactionTypeCode === 0 ? 'ADD' : 'REMOVE')
        setDescription(
            'Ordinary' +
                (transactionTypeCode === 0
                    ? ' incoming flow'
                    : ' outgoing flow')
        )
    }, [transactionTypeCode])

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
