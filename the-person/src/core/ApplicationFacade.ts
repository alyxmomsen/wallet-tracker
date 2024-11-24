import { IPerson, MainPerson, Person } from './Person'
import { IPlanner, RequirementPlanner } from './Planner'
import { IRequirement, Requirement } from './Requirement'
import { DecrementMoneyRequirementCommand } from './RequirementBehavior'
import { ITask, RequirementTask } from './Task'

export interface IApplicationSingletoneFacade {
    addPerson(person: IPerson): number
    getPersons(): IPerson[]
    addRequirementSchedule(task: ITask<IRequirement, IPerson>): void
    update(): void
}

export class ApplicationSingletoneFacade
    implements IApplicationSingletoneFacade
{
    private lastId: number
    private persons: IPerson[]
    private personsRegisty: Map<number, IPerson>
    private requirementPlanner: IPlanner<IRequirement, IPerson>

    private requirements: IRequirement[]

    private static instance: ApplicationSingletoneFacade | null

    static Instance() {
        if (ApplicationSingletoneFacade.instance === null) {
            ApplicationSingletoneFacade.instance =
                new ApplicationSingletoneFacade()
        }

        return ApplicationSingletoneFacade.instance
    }

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
        this.requirementPlanner.check()
    }

    private constructor() {
        this.requirements = []
        this.lastId = 0
        this.persons = []
        this.personsRegisty = new Map<number, IPerson>()
        const player = new MainPerson('Arch Player')
        const enemy = new MainPerson('Enemy Danny Elfman')
        this.requirementPlanner = new RequirementPlanner(player)
        this.addPerson(player)
        this.addPerson(enemy)
        // this.addPerson(new MainPerson('Enemy Dann'))
        // this.addPerson(new MainPerson('Enemy Alex'))

        player.addRequirement(
            new Requirement(
                'satisfy the hunger',
                new DecrementMoneyRequirementCommand(500),
                new Date(`${11}-${18}-${2024} ${20}:${10}`)
            )
        )

        player.addRequirement(
            new Requirement(
                'pay for hostel',
                new DecrementMoneyRequirementCommand(699),
                new Date(`${11}-${18}-${2024} ${20}:${12}`)
            )
        )
    }
}
