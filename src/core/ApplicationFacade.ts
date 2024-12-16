import { PersonFactory } from './person/factories/PersonFactory'
import { IPerson } from './person/Person'
import { IRequirementCommand } from './requirement-command/RequirementCommand'
import { IAuthService } from './services/auth-service'
import { ICreateUserService } from './services/create-user-service'

import { ITask } from './Task'

export interface IApplicationSingletoneFacade {
    addRequirementSchedule(task: ITask<IRequirementCommand, IPerson>): void
    update(): void
    setUser(): void
    createUser(
        userName: string,
        password: string,
        createUserService: ICreateUserService
    ): Promise<ICreateUserResponseData>
    getUserData(): void
    authUserAsync(
        userName: string,
        password: string,
        authService: IAuthService
    ): Promise<IAuthUserResponseData>
}

export interface IResponseData<T> {
    payload: T | null
    status: {
        code: number
        details: string
    }
}

export interface ICreateUserResponseData
    extends IResponseData<{
        userId: string
    }> {}

export interface IAuthUserResponseData extends ICreateUserResponseData {}

export class ApplicationSingletoneFacade
    implements IApplicationSingletoneFacade
{
    private personFactory: PersonFactory
    // private otherUsers: IPerson[];
    private user: IPerson | null
    private static instance: ApplicationSingletoneFacade | null = null

    async authUserAsync(
        userName: string,
        password: string,
        authService: IAuthService
    ): Promise<IAuthUserResponseData> {
        return authService.execute(userName, password)
    }

    getUserData(): IPerson | null {
        if (this.user === null) {
            return null
        }

        return this.user
    }

    async createUser(
        userName: string,
        password: string,
        createUserService: ICreateUserService
    ): Promise<ICreateUserResponseData> {
        return createUserService.execute(userName, password)
    }

    setUser(): void {
        this.personFactory.create('', 0)
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

    update() {}

    /* private  */ constructor() {
        // this.personRegistryLocal = new PersonRegistry()
        this.personFactory = new PersonFactory()

        // this.users = []

        this.user = null

        console.log('app constructor ran')
    }
}
