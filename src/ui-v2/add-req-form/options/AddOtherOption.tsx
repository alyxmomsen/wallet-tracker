import React, { useState } from 'react'

const AddOtherOption = () => {
    const [options, setOptions] = useState<string[]>(['description'])

    const [isActive, setIsActive] = useState(false)

    return (
        <div className="flex-box margin-auto">
            <div>options:</div>
            <div>
                <button onClick={() => setIsActive((cur) => !cur)}>+</button>
                {isActive
                    ? options.map((elem) => (
                          <button className={'btn'}>{elem}</button>
                      ))
                    : null}
            </div>
        </div>
    )
}

export default AddOtherOption
