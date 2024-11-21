import { IPerson } from './Person'

export interface IRequirementBehavior {
    execute(person: IPerson): boolean
    getDescription(): string
}

export class DecrementMoneyRequirementBehavior implements IRequirementBehavior {
    decrementValue: number

    getDescription(): string {
        return `pay ${this.decrementValue}`
    }

    execute(person: IPerson): boolean {
        person.decrementWallet(688)
        return true
    }

    constructor(value: number) {
        this.decrementValue = value
    }
}
