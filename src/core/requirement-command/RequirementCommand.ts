import { IPerson } from '../person/Person'

export interface ITransactionRequirementCommand {
    execute(person: IPerson): boolean
    getId(): string
    getDescription(): string
    getTitle(): string
    getValue(): number
    executeWithValue(value: number): number
    getExecutionTimestamp(): number
    checkIfExecuted(): boolean
    getTransactionTypeCode(): number
    getDeletedTheState(): boolean
    subscribeOnUpdate(cb: () => void): void
}

abstract class TransactionRequirementCommand
    implements ITransactionRequirementCommand
{
    abstract executeWithValue(value: number): number

    abstract execute(person: IPerson): boolean

    subscribeOnUpdate(cb: () => void): void {
        this.observeables.push({ cb, executedTimeStamp: 0 })
    }

    getId(): string {
        return this.id
    }

    getTitle(): string {
        return this.title
    }

    getTransactionTypeCode(): number {
        return this.transactionTypeCode
    }

    checkIfExecuted(): boolean {
        return this.isExecuted
    }

    getExecutionTimestamp(): number {
        return this.date
    }

    getDescription(): string {
        return this.description
    }

    getValue(): number {
        return this.value
    }

    getDeletedTheState(): boolean {
        return this.deleted
    }

    constructor(
        id: string,
        value: number,
        title: string,
        description: string,
        date: number,
        transactionTypeCode: number
    ) {
        this.id = id
        this.value = value
        this.description = description
        this.date = date
        this.isExecuted = false
        this.title = title
        this.transactionTypeCode = transactionTypeCode
        this.deleted = false
        this.observeables = []
    }
    protected id: string
    protected title: string
    protected value: number
    protected description: string
    protected date: number
    protected isExecuted: boolean
    protected transactionTypeCode: number
    protected deleted: boolean
    protected observeables: { cb: () => void; executedTimeStamp: number }[]
}

export class IncrementMoneyRequirementCommand extends TransactionRequirementCommand {
    execute(person: IPerson): boolean {
        if (this.isExecuted) {
            return false
        }

        const balanceBefore = person.getWalletBalance()
        person.incrementWallet(this.value)
        this.isExecuted = true

        this.observeables.forEach((elem) => {
            elem.cb()
            elem.executedTimeStamp = Date.now()
        })

        return true
    }

    executeWithValue(value: number): number {
        return value + this.value
    }

    constructor(
        id: string,
        value: number,
        title: string,
        description: string,
        date: number
    ) {
        super(id, value, title, description, date, 0)
    }
}

export class DecrementMoneyRequirementCommand extends TransactionRequirementCommand {
    executeWithValue(value: number): number {
        return value - this.value
    }

    getValue(): number {
        return this.value
    }

    getDescription(): string {
        return `pay ${this.value}`
    }

    execute(person: IPerson): boolean {
        if (this.isExecuted) {
            return false
        }

        const balanceBefore = person.getWalletBalance()
        person.decrementWallet(this.value)
        this.isExecuted = true

        this.observeables.forEach((elem) => {
            elem.cb()
            elem.executedTimeStamp = Date.now()
        })

        return true
    }

    constructor(
        id: string,
        value: number,
        title: string,
        description: string,
        date: number
    ) {
        super(id, value, title, description, date, 1)
    }
}
