import React, { useEffect, useState } from 'react'
import { UseDateFormContext } from '../../context/AddRequirementContextProvider'

const DateOptionUI = () => {
    const { dateToExecute, setDateToExecute } = UseDateFormContext()

    const [date, setDate] = useState<string>(
        (new Date(dateToExecute).getDate() < 10 ? '0' : '') +
            new Date(dateToExecute).getDate().toString()
    )
    const [month, setMonth] = useState<string>(
        (new Date(dateToExecute).getMonth() + 1 < 10 ? '0' : '') +
            (new Date(dateToExecute).getMonth() + 1).toString()
    )
    const [year, setYear] = useState<string>(
        new Date(dateToExecute).getFullYear().toString()
    )

    useEffect(() => {
        setDate(
            (new Date(dateToExecute).getDate() < 10 ? '0' : '') +
                new Date(dateToExecute).getDate().toString()
        )
        setMonth(
            (new Date(dateToExecute).getMonth() + 1 < 10 ? '0' : '') +
                (new Date(dateToExecute).getMonth() + 1).toString()
        )
        setYear(new Date(dateToExecute).getFullYear().toString())
    }, [dateToExecute])

    useEffect(() => {}, [year, month, date])

    return (
        <div className="flex-box flex-dir-col flex-item bdr pdg">
            <div className="flex-box flex-center bdr pdg">
                <div>date:</div>
                <div>
                    <input
                        className="value-color--txt"
                        value={`${year}-${month}-${date}`}
                        type="date"
                        onChange={(e) => {
                            const dateString = e.target.value

                            setDateToExecute(foo(dateString).getTime())
                        }}
                    />
                </div>
            </div>
            <div className="flex-box">
                <div className="flex-box flex-center bdr pdg">
                    <div>
                        <button
                            onClick={() => {
                                const newDateObj = new Date(dateToExecute)

                                newDateObj.setDate(
                                    new Date(dateToExecute).getDate() + 1
                                )

                                setDateToExecute(newDateObj.getTime())
                            }}
                            className="btn"
                        >
                            +
                        </button>
                    </div>
                    <div>day</div>
                    <div>
                        <button
                            onClick={() => {
                                const newDateObj = new Date(dateToExecute)

                                newDateObj.setDate(
                                    new Date(dateToExecute).getDate() - 1
                                )

                                setDateToExecute(newDateObj.getTime())
                            }}
                            className="btn"
                        >
                            -
                        </button>
                    </div>
                </div>
                <div className="flex-box flex-center bdr pdg">
                    <div>
                        <button
                            onClick={() => {
                                const newDateObj = new Date(dateToExecute)

                                newDateObj.setDate(
                                    new Date(dateToExecute).getDate() + 7
                                )

                                setDateToExecute(newDateObj.getTime())
                            }}
                            className="btn"
                        >
                            +
                        </button>
                    </div>
                    <div>week</div>
                    <div>
                        <button
                            onClick={() => {
                                const newDateObj = new Date(dateToExecute)

                                newDateObj.setDate(
                                    new Date(dateToExecute).getDate() - 7
                                )

                                setDateToExecute(newDateObj.getTime())
                            }}
                            className="btn"
                        >
                            -
                        </button>
                    </div>
                </div>
                <div className="flex-box flex-center bdr pdg">
                    <div>
                        <button
                            onClick={() => {
                                const newDateObj = new Date(dateToExecute)

                                newDateObj.setMonth(
                                    new Date(dateToExecute).getMonth() + 1
                                )

                                setDateToExecute(newDateObj.getTime())
                            }}
                            className="btn"
                        >
                            +
                        </button>
                    </div>
                    <div>month</div>
                    <div>
                        <button
                            onClick={() => {
                                const newDateObj = new Date(dateToExecute)

                                newDateObj.setMonth(
                                    new Date(dateToExecute).getMonth() - 1
                                )

                                setDateToExecute(newDateObj.getTime())
                            }}
                            className="btn"
                        >
                            -
                        </button>
                    </div>
                </div>
                <div className="flex-box flex-center bdr pdg">
                    <div>
                        <button
                            onClick={() => {
                                const newDateObj = new Date(dateToExecute)

                                newDateObj.setFullYear(
                                    new Date(dateToExecute).getFullYear() + 1
                                )

                                setDateToExecute(newDateObj.getTime())
                            }}
                            className="btn"
                        >
                            +
                        </button>
                    </div>
                    <div>year</div>
                    <div>
                        <button
                            onClick={() => {
                                const newDateObj = new Date(dateToExecute)

                                newDateObj.setFullYear(
                                    new Date(dateToExecute).getFullYear() - 1
                                )

                                setDateToExecute(newDateObj.getTime())
                            }}
                            className="btn"
                        >
                            -
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DateOptionUI

function foo(str: string): Date {
    const regexp = new RegExp(/\d\d\d\d-\d\d-\d\d/, 'gi')

    const testResult = regexp.test(str)

    if (!testResult) {
        return new Date()
    }

    let [year, month, date] = str.split('-')

    year = deletPreventNulls(year)
    month = deletPreventNulls(month)
    date = deletPreventNulls(date)

    const newDate = new Date(`${Number.parseInt(month)}-${date}-${year}`)

    return newDate
}

function deletPreventNulls(str: string): string {
    const arr = str.split('')

    if (arr.length) {
        if (arr[0] === ' ' || arr[0] === '0') {
            arr.shift()
            return deletPreventNulls(arr.join(''))
        }
    }

    return str
}
