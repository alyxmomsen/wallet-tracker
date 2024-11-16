import { IRequirement } from './Requirement'

export interface IPlanner<T> {
    addTask(task: T): T
}

export class RequirementPlanner implements IPlanner<IRequirement> {
    private tasks: IRequirement[]

    addTask(task: IRequirement): IRequirement {
        this.tasks.push(task)
        return task
    }

    constructor() {
        this.tasks = []
    }
}
