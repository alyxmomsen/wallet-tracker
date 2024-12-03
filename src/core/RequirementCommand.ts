import { IPerson } from './Person'

export interface IRequirementCommand {
    execute(person: IPerson): boolean
    getDescription(): string
    getValue(): number
}

export class IncrementMoneyRequirementCommand implements IRequirementCommand {
    private incrementValue: number

    execute(person: IPerson): boolean {
        person.incrementWallet(this.incrementValue)
        // console.log('check ' + this.incrementValue);

        console.log('wallet ' + person.getWalletBalance())
        return true
    }

    getDescription(): string {
        return `increment ${this.incrementValue}`
    }

    getValue(): number {
        return this.incrementValue
    }

    constructor(value: number) {
        this.incrementValue = value
        // alert(this.incrementValue)
    }
}

export class DecrementMoneyRequirementCommand implements IRequirementCommand {
    private decrementValue: number

    getValue(): number {
        return this.decrementValue
    }

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
