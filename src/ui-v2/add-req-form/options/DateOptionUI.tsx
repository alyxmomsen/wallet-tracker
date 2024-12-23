import React, { useEffect, useState } from 'react'
import { UseDateFormContext } from '../../context/AddRequirementContextProvider'

const DateOptionUI = () => {
    const { dateObj, setDateObj } = UseDateFormContext()

    const [date, setDate] = useState<string>(
        (new Date(dateObj).getDate() < 10 ? '0' : '') +
            new Date(dateObj).getDate().toString()
    )
    const [month, setMonth] = useState<string>(
        (new Date(dateObj).getMonth() + 1 < 10 ? '0' : '') +
            (new Date(dateObj).getMonth() + 1).toString()
    )
    const [year, setYear] = useState<string>(
        new Date(dateObj).getFullYear().toString()
    )

    useEffect(() => {
        setDate(
            (new Date(dateObj).getDate() < 10 ? '0' : '') +
                new Date(dateObj).getDate().toString()
        )
        setMonth(
            (new Date(dateObj).getMonth() + 1 < 10 ? '0' : '') +
                (new Date(dateObj).getMonth() + 1).toString()
        )
        setYear(new Date(dateObj).getFullYear().toString())
    }, [dateObj])

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

                            setDateObj(foo(dateString).getTime())
                        }}
                    />
                </div>
            </div>
            <div className="flex-box">
                <div className="flex-box flex-center bdr pdg">
                    <div>
                        <button
                            onClick={() => {
                                const newDateObj = new Date(dateObj)

                                newDateObj.setDate(
                                    new Date(dateObj).getDate() + 1
                                )

                                setDateObj(newDateObj.getTime())
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
                                const newDateObj = new Date(dateObj)

                                newDateObj.setDate(
                                    new Date(dateObj).getDate() - 1
                                )

                                setDateObj(newDateObj.getTime())
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
                                const newDateObj = new Date(dateObj)

                                newDateObj.setDate(
                                    new Date(dateObj).getDate() + 7
                                )

                                setDateObj(newDateObj.getTime())
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
                                const newDateObj = new Date(dateObj)

                                newDateObj.setDate(
                                    new Date(dateObj).getDate() - 7
                                )

                                setDateObj(newDateObj.getTime())
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
                                const newDateObj = new Date(dateObj)

                                newDateObj.setMonth(
                                    new Date(dateObj).getMonth() + 1
                                )

                                setDateObj(newDateObj.getTime())
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
                                const newDateObj = new Date(dateObj)

                                newDateObj.setMonth(
                                    new Date(dateObj).getMonth() - 1
                                )

                                setDateObj(newDateObj.getTime())
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
                                const newDateObj = new Date(dateObj)

                                newDateObj.setFullYear(
                                    new Date(dateObj).getFullYear() + 1
                                )

                                setDateObj(newDateObj.getTime())
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
                                const newDateObj = new Date(dateObj)

                                newDateObj.setFullYear(
                                    new Date(dateObj).getFullYear() - 1
                                )

                                setDateObj(newDateObj.getTime())
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
