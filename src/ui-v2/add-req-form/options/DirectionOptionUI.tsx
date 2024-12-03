import React from 'react'
import {
    TDirection,
    UseDateFormContext,
} from '../../context/AddRequirementContextProvider'

const DirectionOptionUI = () => {
    const { direction, setDirection } = UseDateFormContext()

    return (
        <div className="flex-box margin-auto">
            <div>{direction}</div>
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
                />
            </div>
        </div>
    )
}

export default DirectionOptionUI
