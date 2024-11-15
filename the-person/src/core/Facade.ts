import {
    IPerson,
    MainPerson,
    Passive,
    EveryDayPassiveExecutorBehavior,
} from './Person'

export interface IFacade {
    addPerson(person: IPerson): number
    getPersons(): IPerson[]
}

export class Facade implements IFacade {
    private lastId: number
    private persons: IPerson[]
    private personsRegisty: Map<number, IPerson>

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
        this.lastId = 0
        this.persons = []
        this.personsRegisty = new Map<number, IPerson>()
        const player = new MainPerson('Arch Player')
        this.addPerson(player)
        this.addPerson(new MainPerson('Enemy Dann'))
        this.addPerson(new MainPerson('Enemy Alex'))

        player.addPassive(
            new Passive(700, new EveryDayPassiveExecutorBehavior(0, 1))
        )

        player.update()
        //   player.update();
        //   player.update();
        //   player.update();
    }
}
