import { createContext, useContext, useEffect, useState } from 'react'

export type TDirection = 'increment' | 'decrement'

export type TDateContext = {
    dateObj: Date
    direction: TDirection
    value: number
    title: string
    description: string
    setDateObj: (dateObj: Date) => void
    setDirection: (direction: TDirection) => void
    setValue: (value: number) => void
    setTitle: (title: string) => void
    setDescription: (descr: string) => void
    // setDirection:() => void
}

const DateContext = createContext<TDateContext | undefined>(undefined)

const AddDateFormContextProvider = ({
    children,
}: {
    children: JSX.Element
}) => {
    const [dateObj, setDateObj] = useState<Date>(new Date())
    const [direction, setDirection] = useState<TDirection>('increment')
    const [value, setValue] = useState<number>(0)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        console.log({ direction })
    }, [direction])

    useEffect(() => {
        console.log({ dateObj })
    }, [dateObj])

    return (
        <DateContext.Provider
            value={{
                dateObj,
                direction,
                value,
                title,
                description,
                setDateObj,
                setDirection /*: (direction:TDirection) => setDirection(direction) */,
                setTitle,
                setValue,
                setDescription,
            }}
        >
            {children}
        </DateContext.Provider>
    )
}

export const UseDateFormContext = () => {
    const ctx = useContext(DateContext)

    if (ctx === undefined) {
        throw new Error('no date context')
    }

    return ctx
}

export default AddDateFormContextProvider
