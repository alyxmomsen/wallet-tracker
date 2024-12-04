import React, { useEffect, useState } from 'react'
import { UseDateFormContext } from '../../context/AddRequirementContextProvider'

const DateOptionUI = () => {
    const { dateObj, setDateObj } = UseDateFormContext()

    const [date, setDate] = useState<string>(
        (dateObj.getDate() < 10 ? '0' : '') + dateObj.getDate().toString()
    )
    const [month, setMonth] = useState<string>(
        (dateObj.getMonth() + 1 < 10 ? '0' : '') +
            (dateObj.getMonth() + 1).toString()
    )
    const [year, setYear] = useState<string>(dateObj.getFullYear().toString())

    useEffect(() => {
        setDate(
            (dateObj.getDate() < 10 ? '0' : '') + dateObj.getDate().toString()
        )
        setMonth(
            (dateObj.getMonth() + 1 < 10 ? '0' : '') +
                (dateObj.getMonth() + 1).toString()
        )
        setYear(dateObj.getFullYear().toString())
    }, [dateObj])

    useEffect(() => {
        //{date  , month , year});
    }, [year, month, date])

    return (
        <div className="flex-box">
            <div>date:</div>
            <input
                value={`${year}-${month}-${date}`}
                type="date"
                onChange={(e) => {
                    const dateString = e.target.value

                    setDateObj(new Date(foo(dateString)))
                }}
            />
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

    //{newDate});
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
