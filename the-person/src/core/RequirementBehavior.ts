import { IPerson } from './Person'

export interface IRequirementCommand {
    execute(person: IPerson): boolean
    getDescription(): string
}

export class DecrementMoneyRequirementCommand implements IRequirementCommand {
    decrementValue: number

    getDescription(): string {
        return `pay ${this.decrementValue}`
    }

    execute(person: IPerson): boolean {
        person.decrementWallet(this.decrementValue)
        return true
    }

    constructor(value: number) {
        this.decrementValue = value
    }
}
