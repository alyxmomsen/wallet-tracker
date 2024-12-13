// import { PersonRegistry } from '../core-utils/core-utils'
import { PersonFactory } from './person/factories/PersonFactory'
import { IPerson } from './person/Person'
import { IRequirementCommand } from './RequirementCommand'

import { ITask } from './Task'

export interface IApplicationSingletoneFacade {
    addPerson(name: string, walletInitialValue: number, pass: string): string
    getPersons(): IPerson[]
    addRequirementSchedule(task: ITask<IRequirementCommand, IPerson>): void
    update(): void
    setUser(): void
}

export class ApplicationSingletoneFacade
    implements IApplicationSingletoneFacade
{
    private personFactory: PersonFactory
    // private personRegistryLocal: PersonRegistry // is temporary
    private usersPool: IPerson[]
    private currentPerson: IPerson | null
    private static instance: ApplicationSingletoneFacade | null = null

    setUser(): void {
        if (this.currentPerson) {
        }

        this.personFactory.execute('', 0)
    }

    setCurrentPersonBy(username: string, pass: string) {
        // const result = this.personRegistryLocal.getPersonsByUserNameAndPass(
        //     username,
        //     pass
        // )

        // if (result.length) {
        //     this.currentPerson = result[0]

        //     return true
        // }

        return false
    }

    setCurrentPerson(person: IPerson) {
        this.currentPerson = person
    }

    getPersonById() {
        // this.k
    }

    static Instance() {
        if (ApplicationSingletoneFacade.instance === null) {
            ApplicationSingletoneFacade.instance =
                new ApplicationSingletoneFacade()
        }

        console.log({ instance: ApplicationSingletoneFacade.instance })
        return ApplicationSingletoneFacade.instance
    }

    addRequirementSchedule(task: ITask<IRequirementCommand, IPerson>) {}

    addPerson(name: string, walletInitialValue: number, pass: string): string {
        const newPerson = this.personFactory.execute(
            name,
            walletInitialValue
            // pass
        )

        // this.personRegistryLocal.addPerson(newPerson)

        // this.persons.push(newPerson)

        return 'string'
    }

    getPersons(): IPerson[] {
        return []
    }

    update() {}

    /* private  */ constructor() {
        // this.personRegistryLocal = new PersonRegistry()
        this.personFactory = new PersonFactory()

        this.usersPool = []

        this.currentPerson = null
    }
}
