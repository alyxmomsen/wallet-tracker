import { IPerson, MainPerson } from './Person'
import { IPlanner, RequirementPlanner } from './Planner'
import { IRequirement, Requirement } from './Requirement'
import { RequirementBehavior } from './RequirementBehavior'
import { ITask, RequirementTask } from './Task'

export interface IFacade {
    addPerson(person: IPerson): number
    getPersons(): IPerson[]
    addRequirementSchedule(task: ITask<IRequirement, IPerson>): void
    update(): void
}

export class Facade implements IFacade {
    private lastId: number
    private persons: IPerson[]
    private personsRegisty: Map<number, IPerson>
    private requirementPlanner: IPlanner<IRequirement, IPerson>

    addRequirementSchedule(task: ITask<IRequirement, IPerson>) {
        this.requirementPlanner.addTask(task)
    }

    addPerson(person: IPerson): number {
        const newID = this.lastId + 1
        this.lastId = newID
        this.personsRegisty.set(newID, person)
        this.persons.push(person)

        return newID
    }

    getPersons() {
        return this.persons
    }

    update() {
        this.requirementPlanner.check();
    }

    constructor() {
        this.lastId = 0
        this.persons = []
        this.personsRegisty = new Map<number, IPerson>()
        const player = new MainPerson('Arch Player')
        this.requirementPlanner = new RequirementPlanner(player)
        this.addPerson(player)
        this.addPerson(new MainPerson('Enemy Dann'))
        this.addPerson(new MainPerson('Enemy Alex'))

        this.addRequirementSchedule(
            new RequirementTask(
                new Date(),
                new Requirement('satisfy the hunger', new RequirementBehavior())
            )
        )
        this.addRequirementSchedule(
            new RequirementTask(
                new Date(),
                new Requirement('satisfy the discomfort', new RequirementBehavior())
            )
        )
        this.addRequirementSchedule(
            new RequirementTask(
                new Date(),
                new Requirement('satisfy the ...', new RequirementBehavior())
            )
        )
        this.addRequirementSchedule(
            new RequirementTask(
                new Date(),
                new Requirement('satisfy the bad mood', new RequirementBehavior())
            )
        )
    }
}
