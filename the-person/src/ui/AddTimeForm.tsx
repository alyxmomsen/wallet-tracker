import React from 'react'
import { UseDateContext } from './AddRequirementContext'

const AddTimeForm = () => {
    const {
        setHours,
        hours,
        setMinutes,
        minutes,
        month,
        date: day,
        year,
    } = UseDateContext()
    return (
        <div className="pdg bdr">
            <h5>TiME</h5>
            <div className="scale pdg bdr">
                <h6>{'hours:'}</h6>
                <div>
                    <input
                        onChange={(e) => {
                            const value = Number.parseInt(e.currentTarget.value)

                            setHours(value > 23 ? 0 : value < 0 ? 23 : value)
                        }}
                        placeholder="hours"
                        type="number"
                        value={hours}
                    />
                </div>
            </div>
            <div className="scale pdg bdr">
                <h6>minutes</h6>
                <div>
                    <input
                        onChange={(e) => {
                            const value = Number.parseInt(e.currentTarget.value)

                            setMinutes(
                                value > 59
                                    ? (() => 0)()
                                    : value < 0
                                      ? 59
                                      : value
                            )
                        }}
                        placeholder="minutes"
                        type="number"
                        value={minutes}
                    />
                </div>
            </div>
        </div>
    )
}

export default AddTimeForm
