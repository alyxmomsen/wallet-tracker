import React from 'react'
import {
    TDirection,
    UseDateFormContext,
} from '../../context/AddRequirementContextProvider'

const DirectionOptionUI = () => {
    const { direction, setDirection } = UseDateFormContext()

    return (
        <div className="flex-box flex-item bdr pdg">
            <div className="value-color--txt">{direction.toUpperCase()}</div>
            <div>
                <input
                    onChange={(e) => {
                        if (direction !== e.target.value) {
                            setDirection(e.target.value as TDirection)

                            // setDirectionName(
                            //     e.target.value as 'increment' | 'decrement'
                            // )
                        }
                    }}
                    checked={direction === 'increment'}
                    value={'increment'}
                    type="radio"
                    className="btn"
                />
                <input
                    onChange={(e) => {
                        if (direction !== e.target.value) {
                            setDirection(e.target.value as TDirection)
                            // setDirectionName(
                            //     e.target.value as 'increment' | 'decrement'
                            // )
                        }
                    }}
                    checked={direction === 'decrement'}
                    value={'decrement'}
                    type="radio"
                    className="btn"
                />
            </div>
        </div>
    )
}

export default DirectionOptionUI
