import React, { useEffect, useState } from 'react'
import { UseDateFormContext } from '../../context/AddRequirementContextProvider'

const DateOptionUI = () => {
    const { dateObj, setDateObj } = UseDateFormContext()

    useEffect(() => {
        console.log({ dateObj })
    }, [])

    return (
        <div className="flex-box margin-auto">
            <div>date:</div>
            <input
                value={`${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : dateObj.getDate()}`}
                type="date"
                onChange={(e) => {
                    console.log(e.target.value)
                    console.log(
                        `${foo(e.target.value).month}-${foo(e.target.value)
                            .date.split('')
                            .filter((elem, i) =>
                                i == 0 && Number.parseInt(elem) === 0
                                    ? false
                                    : true
                            )
                            .join('')}-${foo(e.target.value).year}`
                    )
                    setDateObj(
                        new Date(
                            `${foo(e.target.value).month}-${foo(e.target.value)
                                .date.split('')
                                .filter((elem, i) =>
                                    i == 0 && Number.parseInt(elem) === 0
                                        ? false
                                        : true
                                )
                                .join('')}-${foo(e.target.value).year}`
                        )
                    )
                }}
            />
        </div>
    )
}

export default DateOptionUI

function foo(str: string) {
    const [year, month, date] = str.split('-')

    return { date, month, year }
}
