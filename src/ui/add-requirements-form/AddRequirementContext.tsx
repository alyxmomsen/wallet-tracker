import { createContext, useContext, useState } from 'react'
import { DateContextValue, TTransactionType } from './AddReqForm'

export const DateContext = createContext<DateContextValue | undefined>(
    undefined
)

export const AddRequirementContextPorvider = ({
    children,
}: {
    children: JSX.Element
}) => {
    const [day, setDay] = useState(new Date().getDate())
    const [month, setMonth] = useState(new Date().getMonth() + 1)
    const [year, setYear] = useState(new Date().getFullYear())

    const [minutes, setMinutes] = useState(new Date().getMinutes())
    const [hours, setHours] = useState(
        (() => {
            return new Date().getHours()
        })()
    )

    const [transactionValue, setTransactionValue] = useState<number>(1000)

    const [transactionType, setTransactionType] =
        useState<TTransactionType>('inc')

    return (
        <DateContext.Provider
            value={{
                date: day,
                month,
                year,
                minutes,
                hours,
                transactionType,
                transactionValue,
                setDate: (value: number) => setDay(value),
                setMonth: (value: number) => setMonth(value),
                setYear: (value: number) => setYear(value),
                setHours: (value: number) => setHours(value),
                setMinutes: (value: number) => setMinutes(value),
                setTransactionType: (value: TTransactionType) =>
                    setTransactionType(value),
                setTransactionValue: (value: number) =>
                    setTransactionValue(value),
            }}
        >
            {children}
        </DateContext.Provider>
    )
}

export const UseDateContext = (): DateContextValue => {
    const ctx = useContext(DateContext)

    if (ctx === undefined) {
        throw new Error('oh, fuck')
    }

    return ctx
}
