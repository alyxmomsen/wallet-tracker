import { PersonFactory } from './person/factories/PersonFactory'
import { IPerson } from './person/Person'
import { IRequirementCommand } from './requirement-command/RequirementCommand'
import { IAuthService } from './services/auth-service'
import { ICreateUserService } from './services/create-user-service'
import { ILocalStorageManagementService } from './services/local-storage-service'
import { IServerConnector } from './services/server-connector-service-facade'

import { ITask } from './Task'

export interface IApplicationSingletoneFacade {
    addRequirementSchedule(task: ITask<IRequirementCommand, IPerson>): void
    update(): void
    setUserLocally(user:IPerson): void
    createUserRemote(
        userName: string,
        password: string,
        createUserService: ICreateUserService
    ): Promise<ICreateUserResponseData>
    getUser(): void
    authUserAsync(
        userName: string,
        password: string,
        authService: IAuthService
    ): Promise<IAuthUserResponseData>
    onUpdated(cb:()=> void):void
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
    private updatingStatus: boolean;
    private personFactory: PersonFactory
    // private otherUsers: IPerson[];
    private user: IPerson | null
    private static instance: ApplicationSingletoneFacade | null = null
    private localStorageManagementSerice: ILocalStorageManagementService
    private serverConnector: IServerConnector;
    private callbackPull: (() => void)[];

    onUpdated(cb: () => void): void {
        this.callbackPull.push(() => cb())
    }

    async authUserAsync(
        userName: string,
        password: string,
        authService: IAuthService
    ): Promise<IAuthUserResponseData> {
        const response = await authService.execute(userName, password)

        if (response.payload) {
            this.localStorageManagementSerice.setAuthData(
                response.payload.userId
            )
        }

        return response
    }

    getUser(): IPerson | null {
        if (this.user === null) {
            return null
        }

        return this.user
    }

    async createUserRemote(
        userName: string,
        password: string,
        createUserService: ICreateUserService
    ): Promise<ICreateUserResponseData> {
        return createUserService.execute(userName, password)
    }

    setUserLocally(user:IPerson): void {
        this.user = user;
    }

    static Instance(localStorageService: ILocalStorageManagementService ,serverConnector:IServerConnector) {
        if (ApplicationSingletoneFacade.instance === null) {
            ApplicationSingletoneFacade.instance =
                new ApplicationSingletoneFacade(localStorageService ,serverConnector)
        }

        console.log({ instance: ApplicationSingletoneFacade.instance })
        return ApplicationSingletoneFacade.instance
    }

    addRequirementSchedule(task: ITask<IRequirementCommand, IPerson>) {}

    update() {}

    /* private  */ constructor(
        localStorageService: ILocalStorageManagementService ,
        serverConnector: IServerConnector
    ) {
        // this.personRegistryLocal = new PersonRegistry()
        this.callbackPull = [];
        this.updatingStatus = false;
        this.personFactory = new PersonFactory()
        this.localStorageManagementSerice = localStorageService
        this.serverConnector = serverConnector;
        // this.users = []

        this.user = null

        console.log('app constructor ran')

        const authData = this.localStorageManagementSerice.getAuthData()

        if (authData) {
            this.updatingStatus = true;
            this.serverConnector.getUserById(authData).then(response => {

                const { payload , status } = response;

                if (payload) {
                    
                    const user = this.personFactory.create(authData, payload.userName, payload.wallet,);
                    
                    this.setUserLocally(user);
                }

                this.callbackPull.forEach(cb => cb())
                this.updatingStatus = false;
            });

        }


        // this.createUser()
    }
}
