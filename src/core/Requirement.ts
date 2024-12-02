import { IRequirementCommand } from './RequirementCommand'
import { IPerson } from './Person'

export interface IRequirement {
    incrementLevel(value: number): number
    decrementLevel(vlaue: number): number
    satisfy(person: IPerson): boolean
    go(person: IPerson): void
    checkIfActual(): boolean
    getTitle(): string
    getFormatedStringDate(): string
    getBehaviorDescription(): string
    getDateObj(): Date
    getValue(): number
}

export class Requirement implements IRequirement {
    private title: string
    private level: number
    private isSatisfied: boolean
    private command: IRequirementCommand
    private dateToStart: Date
    // private value: number;

    getValue(): number {
        return this.command.getValue()
    }
    getDateObj(): Date {
        return this.dateToStart
    }

    getFormatedStringDate(): string {
        const monthes = [
            'jan_war',
            'phebral',
            'm_ART',
            'App_Real',
            'may',
            'jun',
            'jule',
            'aw_ghost',
            'septum_Beer',
            'ecto_beer',
            'novam_Beer',
            'decem_beer',
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
        return !this.isSatisfied
    }

    go(person: IPerson): void {
        this.command.execute(person)
    }

    satisfy(person: IPerson): boolean {
        this.command.execute(person)

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
        return this.command.getDescription()
    }

    constructor(
        title: string,
        behavior: IRequirementCommand,
        dateToStart: Date
    ) {
        this.title = title
        this.level = 0
        this.isSatisfied = false
        this.command = behavior
        this.dateToStart = dateToStart
        // this.value = 0;
    }
}
