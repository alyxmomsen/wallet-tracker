import { IRequirementBehavior } from './RequirementBehavior'
import { IPerson } from './Person'

export interface IRequirement {
    incrementLevel(value: number): number
    decrementLevel(vlaue: number): number
    satisfy(): boolean
    go(person: IPerson): void
    checkIfActual(): boolean
    getTitle(): string
    getFormatedStringDate(): string
    getBehaviorDescription(): string
}

export class Requirement implements IRequirement {
    private title: string
    private level: number
    private isSatisfied: boolean
    private behavior: IRequirementBehavior
    private dateToStart: Date
    // private value: number;

    getFormatedStringDate(): string {
        const monthes = [
            'jan',
            'pheb',
            'marth',
            'april',
            'may',
            'jun',
            'jule',
            'aw_ghost',
            'septum_beer',
            'ecto_beer',
            'nova_beer',
            'decemal_beer',
        ]

        return `
        ${this.dateToStart.getDate()} 
        ${monthes[this.dateToStart.getMonth()]} 
        ${this.dateToStart.getFullYear()}

    ${this.dateToStart.getHours()} :
    ${this.dateToStart.getMinutes()}
        `
    }

    getTitle(): string {
        return this.title
    }

    checkIfActual(): boolean {
        return true
    }

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

    getBehaviorDescription(): string {
        return this.behavior.getDescription()
    }

    constructor(
        title: string,
        behavior: IRequirementBehavior,
        dateToStart: Date
    ) {
        this.title = title
        this.level = 0
        this.isSatisfied = false
        this.behavior = behavior
        this.dateToStart = dateToStart
        // this.value = 0;
    }
}
