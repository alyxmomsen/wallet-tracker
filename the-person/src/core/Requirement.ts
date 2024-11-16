import { IRequirementBehavior } from './RequirementBehavior'
import { IPerson } from './Person'

export interface IRequirement {
    incrementLevel(value: number): number
    decrementLevel(vlaue: number): number
    satisfy(): boolean
    go(person: IPerson): void
}

export class Requirement implements IRequirement {
    private title: string
    private level: number
    private isSatisfied: boolean
    private behavior: IRequirementBehavior

    go(person: IPerson): void {
        this.behavior.execute(person)
    }

    satisfy(): boolean {
        this.isSatisfied = true
        return this.isSatisfied
    }

    incrementLevel(value: number) {
        this.level += value

        return this.level
    }

    decrementLevel(vlaue: number) {
        this.level -= vlaue
        return this.level
    }

    constructor(title: string, behavior: IRequirementBehavior) {
        this.title = title
        this.level = 0
        this.isSatisfied = false
        this.behavior = behavior
    }
}
