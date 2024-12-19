import { createContext, useContext, useEffect, useState } from 'react'
import { UseAppContext } from './UseAppContext'
import { IPerson } from '../../core/person/Person'
import { averageValueUtil } from '../../utils/averageValueUtil'
import DescriptionOptionUI from '../add-req-form/options/DescriptionOption'

export type TDirection = 'increment' | 'decrement'

export type TDateContext = {
    dateObj: number
    direction: TDirection
    value: number
    title: string
    description: string
    setDateObj: (dateObj: number) => void
    setDirection: (direction: TDirection) => void
    setValue: (value: number) => void
    setTitle: (title: string) => void
    setDescription: (descr: string) => void
    isRequirementAddedSuccessfully: boolean
    setIsRequirementAddedSuccessfully: (state: boolean) => void
    isNewRequirementBeingWritten: boolean
    setIsNewRequirementBeingWritten: (state: boolean) => void
    // setDirection:() => void
    optionalFields: OptionElement[]
    setOptionalFields: (elem: OptionElement[]) => void
}

const DateContext = createContext<TDateContext | undefined>(undefined)

const AddDateFormContextProvider = ({
    children,
}: {
    children: JSX.Element
}) => {
    const { loginedPerson: currentPerson } = UseAppContext()

    const [dateObj, setDateObj] = useState<number>(Date.now())
    const [direction, setDirection] = useState<TDirection>('increment')
    const [value, setValue] = useState<number>(
        currentPerson ? averageValueUtil(currentPerson) : 0
    )
    const [title, setTitle] = useState('no title')
    const [description, setDescription] = useState('no description')

    const [isRequirementAddedSuccessfully, setIsRequirementAddedSuccessfully] =
        useState(false)
    const [isNewRequirementBeingWritten, setIsNewRequirementBeingWritten] =
        useState(true)

    const [optionalFields, setOptionalFields] = useState<OptionElement[]>([
        new OptionElement('DESK Creep SHon', () => <DescriptionOptionUI />),
    ])

    useEffect(() => {}, [direction])

    useEffect(() => {}, [dateObj])

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
                isRequirementAddedSuccessfully,
                setIsRequirementAddedSuccessfully,
                isNewRequirementBeingWritten,
                setIsNewRequirementBeingWritten,
                optionalFields,
                setOptionalFields,
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

export class OptionElement {
    protected id: number
    protected hof: () => JSX.Element
    protected title: string
    protected isActive: boolean
    execute(): JSX.Element | null {
        if (!this.isActive) {
            return null
        }

        return this.hof()
    }

    getTitle() {
        return this.title
    }

    setIsActive(value: boolean) {
        this.isActive = value
    }

    getIsActive(): boolean {
        return this.isActive
    }

    constructor(title: string, Hof: () => JSX.Element) {
        this.id = 0
        this.hof = Hof
        this.title = title
        this.isActive = false
    }
}
