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

    const [checkedValueVar, setCheckedValueVariate] =
        useState<TValueVariate | null>(
            valueVariates.length ? valueVariates[0] : null
        )

    return (
        <div className="bdr pdg flex-box flex-dir-col flex-item">
            <div className="flex-box">
                <div className="flex-box bdr pdg">
                    {valueVariates.map((variate) => {
                        return (
                            <div key={variate.id}>
                                <button
                                    className={
                                        'btn' +
                                        `${variate.id === checkedValueVar?.id ? ' checked' : ''}`
                                    }
                                    onClick={() => {
                                        if (variate === checkedValueVar) {
                                            setValue(variate.value)
                                        }

                                        setCheckedValueVariate(variate)
                                    }}
                                >
                                    {variate.value}
                                </button>
                            </div>
                        )
                    })}
                </div>
                <div className="flex-box bdr pdg flex-center">
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
                    <div>{checkedValueVar ? checkedValueVar.value : 0}</div>
                    <div>
                        <button
                            onClick={() => {
                                if (checkedValueVar) {
                                    setValue(value - checkedValueVar.value)
                                }
                            }}
                            className="btn"
                        >
                            -
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex-box flex-center">
                <div>value:</div>
                <div>
                    <input
                        className="value-color--txt"
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
