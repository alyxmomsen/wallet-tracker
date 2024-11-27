import React, { useContext, useEffect } from 'react'
import { UseDateContext } from './AddRequirementContext'

const AddDateForm = () => {
    const {
        setMinutes,
        setHours,
        setDate: setDay,
        setMonth,
        setYear,
        year,
        month,
        date: day,
    } = UseDateContext()

    useEffect(() => {
        setMinutes(
            (() => {
                const currentDate = new Date()

                return year !== currentDate.getFullYear() ||
                    month !== currentDate.getMonth() + 1 ||
                    day !== currentDate.getDate()
                    ? 30
                    : currentDate.getMinutes()
            })()
        )
        setHours(
            (() => {
                const currentDate = new Date()

                return year !== currentDate.getFullYear() ||
                    month !== currentDate.getMonth() + 1 ||
                    day !== currentDate.getDate()
                    ? 12
                    : currentDate.getHours()
            })()
        )
    }, [day, month, year])

    return (
        <div className="pdg bdr scale">
            <h5>DATE</h5>
            <div className="pdg">
                <button
                    onClick={() => {
                        const date = new Date()
                        setDay(date.getDate())
                        setMonth(date.getMonth() + 1)
                        setYear(date.getFullYear())
                    }}
                    className="btn"
                >
                    set current
                </button>
            </div>
            <div className="pdg bdr">
                <input
                    onChange={(e) => {
                        console.log(e.currentTarget.value)
                        const date = e.currentTarget.value
                        const [year, month, day] = date.split('-')
                        console.log({ year, month, day })
                        setDay(Number.parseInt(day))
                        setMonth(Number.parseInt(month))
                        setYear(Number.parseInt(year))
                    }}
                    type="date"
                    value={`${year}-${month}-${day}`}
                />
            </div>
        </div>
    )
}

export default AddDateForm
