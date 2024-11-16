import { IPerson } from './Person'
import { IRequirement } from './Requirement'
import { ITask } from './Task'

export interface IPlanner<T, S> {
    addTask(task: ITask<T, S>): ITask<T, S>
    check(): void;
}

export class RequirementPlanner implements IPlanner<IRequirement, IPerson> {
    private tasks: ITask<IRequirement, IPerson>[]
    private subject: IPerson

    addTask(task: ITask<IRequirement, IPerson>): ITask<IRequirement, IPerson> {
        this.tasks.push(task)
        return task
    }

    check() {
        this.tasks = this.tasks.filter((task) => {
            if (true) {
                task.apply(this.subject)
                return false
            }

            return true
        })
    }

    constructor(person: IPerson) {
        this.tasks = []
        this.subject = person
    }
}
