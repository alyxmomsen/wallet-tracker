import { IPerson, OrdinaryPerson as OrdinaryPerson, Person } from './Person'
import { IPlanner, RequirementPlanner } from './Planner'
import { IRequirement, Requirement } from './Requirement'
import {
    DecrementMoneyRequirementCommand,
    IncrementMoneyRequirementCommand,
} from './RequirementCommand'
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

    private static instance: ApplicationSingletoneFacade | null = null

    static Instance() {
        if (ApplicationSingletoneFacade.instance === null) {
            ApplicationSingletoneFacade.instance =
                new ApplicationSingletoneFacade()
        }

        console.log({ instance: ApplicationSingletoneFacade.instance })
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

    /* private  */ constructor() {
        this.requirements = []
        this.lastId = 0
        this.persons = []
        this.personsRegisty = new Map<number, IPerson>()

        // preload

        const jenaro = new OrdinaryPerson('Don Jenaro', 2106 + 400)
        const juan = new OrdinaryPerson('Don Juan', 0)
        const carlos = new OrdinaryPerson('Carolos Castaneda', 0)
        this.requirementPlanner = new RequirementPlanner(jenaro)

        this.addPerson(jenaro)
        this.addPerson(juan)
        this.addPerson(carlos)
    }
}
