import { IPerson } from './Person'
import { IRequirement } from './Requirement'
import { ITask, RequirementTask } from './Task'

export interface IPlanner<T, S> {
    addTask(task: ITask<T, S>): ITask<T, S>
    check(): void
}

export class RequirementPlanner implements IPlanner<IRequirement, IPerson> {
    private tasks: ITask<IRequirement, IPerson>[]
    private subject: IPerson

    addTask(task: ITask<IRequirement, IPerson>): ITask<IRequirement, IPerson> {
        this.tasks.push(task)
        return task
    }

    check() {
        const updatedTasks: ITask<IRequirement, IPerson>[] = []

        this.tasks = this.tasks.filter((task) => {
            if (true) {
                // task.apply(this.subject)
                const dateObj = task.getDateStart()
                dateObj.setDate(dateObj.getDate() + 1)
                updatedTasks.push(
                    new RequirementTask(dateObj, task.getRequirement())
                )
                return false
            }

            return true
        })

        this.tasks = [...this.tasks, ...updatedTasks]
    }

    constructor(person: IPerson) {
        this.tasks = []
        this.subject = person
    }
}
