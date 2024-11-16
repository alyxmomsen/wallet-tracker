import { IPerson } from './Person'
import { IRequirement } from './Requirement'

export interface ITask<T, S> {
    apply(subject: S): void
}

export class RequirementTask implements ITask<IRequirement, IPerson> {
    dateStart: Date
    requirement: IRequirement
    apply(subject: IPerson) {
        subject.addRequirement(this.requirement)
    }
    constructor(dateStart: Date, requirement: IRequirement) {
        this.dateStart = dateStart
        this.requirement = requirement
    }
}
