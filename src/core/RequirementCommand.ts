import { IPerson } from './Person'

export interface IRequirementCommand {
    execute(person: IPerson): boolean
    getDescription(): string
    getValue(): number
    executeWithValue(value: number): number
    getExecuteDate(): Date
    checkIfExecuted(): boolean
}

abstract class RequirementCommand implements IRequirementCommand {
    protected title: string
    protected value: number
    protected description: string
    protected date: Date
    protected isExecuted: boolean

    abstract executeWithValue(value: number): number

    abstract execute(person: IPerson): boolean

    checkIfExecuted(): boolean {
        return this.isExecuted
    }

    getExecuteDate(): Date {
        return this.date
    }

    getDescription(): string {
        return this.description
    }

    getValue(): number {
        return this.value
    }

    constructor(value: number, title: string, description: string, date: Date) {
        this.value = value
        this.description = description
        this.date = date
        this.isExecuted = false
        this.title = title
    }
}

export class IncrementMoneyRequirementCommand extends RequirementCommand {
    execute(person: IPerson): boolean {
        const balanceBefore = person.getWalletBalance()
        person.incrementWallet(this.value)

        return true
    }

    executeWithValue(value: number): number {
        return value + this.value;
    }

    constructor(value: number, title: string, description: string, date: Date) {
        super(value, title, description, date)
    }
}

export class DecrementMoneyRequirementCommand extends RequirementCommand {
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
        person.decrementWallet(this.value)
        return true
    }

    constructor(value: number, title: string, description: string, date: Date) {
        super(value, title, description, date)
    }
}
