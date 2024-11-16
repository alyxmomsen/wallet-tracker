import { IPerson, MainPerson } from './Person'
import { IPlanner, RequirementPlanner } from './Planner'
import { IRequirement } from './Requirement'

export interface IFacade {
    addPerson(person: IPerson): number
    getPersons(): IPerson[]
}

export class Facade implements IFacade {
    private lastId: number
    private persons: IPerson[]
    private personsRegisty: Map<number, IPerson>

    private requirementPlanner: IPlanner<IRequirement>

    addRequirementSchedule(requirement: IRequirement) {
        this.requirementPlanner.addTask(requirement)
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

    constructor() {
        this.requirementPlanner = new RequirementPlanner()
        this.lastId = 0
        this.persons = []
        this.personsRegisty = new Map<number, IPerson>()
        const player = new MainPerson('Arch Player')
        this.addPerson(player)
        this.addPerson(new MainPerson('Enemy Dann'))
        this.addPerson(new MainPerson('Enemy Alex'))

        // player.addRequirement(new Requirement('shelter'))

        // player.update()
        //   player.update();
        //   player.update();
        //   player.update();
    }
}
