import React, { useState } from 'react'
import { UseDateFormContext } from '../../context/AddRequirementContextProvider'

type TValueVariate = {
    value: number
    id: number
    checked: boolean
}

const ValueOptionUI = () => {
    const { value, setValue } = UseDateFormContext()

    const [valueVariates, setValueVariates] = useState<TValueVariate[]>([
        { value: 100, id: 0, checked: false },
        { value: 200, id: 1, checked: false },
        { value: 300, id: 2, checked: false },
        { value: 500, id: 3, checked: false },
        { value: 700, id: 4, checked: false },
    ])

    const [checkedValueVar, setCh] = useState<TValueVariate | null>(
        valueVariates.length ? valueVariates[0] : null
    )

    return (
        <div className="bdr pdg">
            <div className="flex-box">
                <div className="flex-box bdr">
                    {valueVariates.map((variate) => {
                        return (
                            <div key={variate.id}>
                                <button
                                    className={
                                        'btn' +
                                        `${variate.id === checkedValueVar?.id ? ' checked' : ''}`
                                    }
                                    onClick={() => {
                                        setCh(variate)
                                    }}
                                >
                                    {variate.value}
                                </button>
                            </div>
                        )
                    })}
                </div>
                <div className="flex-box bdr">
                    <div>
                        <button
                            onClick={() => {
                                if (checkedValueVar) {
                                    setValue(value + checkedValueVar.value)
                                }
                            }}
                            className="btn"
                        >
                            +
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                setValue(value - 0)
                            }}
                            className="btn"
                        >
                            -
                        </button>
                    </div>
                </div>
            </div>
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
        </div>
    )
}

export default ValueOptionUI
