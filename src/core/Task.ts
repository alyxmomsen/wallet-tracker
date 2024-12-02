import { IPerson } from './Person'
import { IRequirement } from './Requirement'

export interface ITask<T, S> {
    // apply(subject: S): void
    getRequirement(): IRequirement
    getDateStart(): Date
}

export class RequirementTask implements ITask<IRequirement, IPerson> {
    dateStart: Date
    requirement: IRequirement
    // apply(subject: IPerson) {
    //     subject.addRequirement(this.requirement)
    // }
    getRequirement(): IRequirement {
        return this.requirement
    }
    getDateStart(): Date {
        return this.dateStart
    }
    constructor(dateStart: Date, requirement: IRequirement) {
        this.dateStart = dateStart
        this.requirement = requirement
    }
}
