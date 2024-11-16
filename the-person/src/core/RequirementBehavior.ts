import { IPerson } from './Person'

export interface IRequirementBehavior {
    execute(person: IPerson): boolean
}

export class RequirementBehavior implements IRequirementBehavior {
    execute(person: IPerson): boolean {
        return true
    }
}
