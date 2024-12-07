import React, { useState } from 'react'

const AddOtherOption = () => {
    const [options, setOptions] = useState<string[]>(['description'])

    const [isActive, setIsActive] = useState(false)

    return (
        <div className="flex-box flex-center flex-item bdr pdg">
            <div>options:</div>
            <div className="flex-box">
                <button
                    className="btn"
                    onClick={() => setIsActive((cur) => !cur)}
                >
                    +
                </button>
                {isActive
                    ? options.map((elem) => (
                          <button disabled className={'btn'}>
                              {elem}
                          </button>
                      ))
                    : null}
            </div>
        </div>
    )
}

export default AddOtherOption
