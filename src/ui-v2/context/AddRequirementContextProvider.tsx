import { createContext, useContext, useEffect, useState } from 'react'
import { UseAppContext } from './UseAppContext'
import { averageValueUtil } from '../../utils/averageValueUtil'
import DescriptionOptionUI from '../add-req-form/options/DescriptionOption'
import { IRrequirementsStatsType } from 'cash-flow/dist/core/requirement-command/interfaces'
/* warning , type importing is not ordinary */


export type TDirection = 0 | 1

export type TAddRequirementContext = {
    setDateToExecute: (dateObj: number) => void
    setTransactionTypeCode: (direction: TDirection) => void
    setValue: (value: number) => void
    setTitle: (title: string) => void
    setDescription: (descr: string) => void
    isRequirementAddedSuccessfully: boolean
    setIsRequirementAddedSuccessfully: (state: boolean) => void
    isNewRequirementBeingWritten: boolean
    setIsNewRequirementBeingWritten: (state: boolean) => void
    optionalFields: OptionElement[]
    setOptionalFields: (elem: OptionElement[]) => void
    loading: boolean
    loaded: boolean
    setLoaded: (state: boolean) => void
    setLoading: (state: boolean) => void
} & Omit<
    IRrequirementsStatsType,
    | 'id'
    | 'userId'
    | 'createdTimeStamp'
    | 'updatedTimeStamp'
    | 'deleted'
    | 'executed'
>

const DateContext = createContext<TAddRequirementContext | undefined>(undefined)

const AddDateFormContextProvider = ({
    children,
}: {
    children: JSX.Element
}) => {
    const { loginedPerson: currentPerson } = UseAppContext()

    const [dateToExecute, setDateToExecute] = useState<number>(Date.now())
    const [transactionTypeCode, setTransactionTypeCode] =
        useState<TDirection>(0)
    const [value, setValue] = useState<number>(
        currentPerson ? averageValueUtil(currentPerson.requirements) : 0
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

    const [loading, setLoading] = useState(false)

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {}, [transactionTypeCode])

    return (
        <DateContext.Provider
            value={{
                loaded,
                loading,
                setLoaded,
                setLoading,
                dateToExecute,
                transactionTypeCode,
                value,
                title,
                description,
                setDateToExecute: setDateToExecute,
                setTransactionTypeCode:
                    setTransactionTypeCode /*: (direction:TDirection) => setDirection(direction) */,
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
