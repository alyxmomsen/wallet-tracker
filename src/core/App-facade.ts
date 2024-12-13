import { TUserRequirementStats } from '../ui-v2/login-window/RegistrationUI'
import { IEventService } from './events/App-event'
import { PersonFactory } from './person/factories/PersonFactory'
import { IPerson } from './person/Person'
import { RequirementFactory } from './requirement-command/factories/RequirementFactory'
import { IRequirementFields } from './requirement-command/interfaces'
import { IRequirementCommand } from './requirement-command/RequirementCommand'
import { IAuthService } from './services/auth-service'
import { ICreateUserService } from './services/create-user-service'
import { ILocalStorageManagementService } from './services/local-storage-service'
import {
    IRequirementManagementService,
    RequrementManagementService,
} from './services/requirement-management-service'
import { IServerConnector } from './services/server-connector-service-facade'

import { ITask } from './Task'

export interface IApplicationSingletoneFacade {
    addRequirement({
        cashFlowDirectionCode,
        dateToExecute,
        description,
        isExecuted,
        title,
        value,
    }: Omit<IRequirementFields, 'userId'>): Promise<any>
    addRequirementSchedule(task: ITask<IRequirementCommand, IPerson>): void
    update(): void
    setUserLocally(user: IPerson): void
    createUserRemote(
        userName: string,
        password: string,
        createUserService: ICreateUserService
    ): Promise<ICreateUserResponseData>
    getLocalUser(): void
    authUserAsync(
        userName: string,
        password: string,
        authService: IAuthService
    ): Promise<IPerson | null>
    onAppUpdated(cb: () => void): void
    onUserIsSet(cb: () => void): void
    onUserUpdated(cb: () => any): any
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
    private updatingStatus: boolean
    private personFactory: PersonFactory
    // private otherUsers: IPerson[];
    private user: IPerson | null
    private static instance: ApplicationSingletoneFacade | null = null
    private localStorageManagementSerice: ILocalStorageManagementService
    private eventServise: IEventService
    private requriementManagementService: IRequirementManagementService
    private serverConnector: IServerConnector
    private callbackPull: (() => void)[]
    private userIsSetCallBackPull: ((user: IPerson) => any)[]

    private updateRequirements(): void {}

    onUserUpdated(cb: () => any) {
        // if(this.user)
        // this.onUserIsSet(() => alert());
    }

    async addRequirement({
        cashFlowDirectionCode,
        dateToExecute,
        description,
        isExecuted,
        title,
        value,
    }: Omit<IRequirementFields, 'userId'>): Promise<any> {
        const authData = this.localStorageManagementSerice.getAuthData()

        if (authData) {
            const data = await this.requriementManagementService.create(
                {
                    cashFlowDirectionCode,
                    dateToExecute,
                    description,
                    isExecuted,
                    title,
                    value,
                },
                authData
            )

            if (data.payload) {
                const newUser = this.personFactory.create(
                    data.payload.id,
                    data.payload.userName,
                    data.payload.wallet
                )

                if (newUser) {
                    data.payload.requirements.forEach((requirement) => {
                        const newRequirement = new RequirementFactory().create({
                            ...requirement,
                            flowDirectionCode: requirement.transactionTypeCode,
                        })

                        if (newRequirement) {
                            newUser.addRequirementCommand(newRequirement)
                        }
                    })

                    this.setUserLocally(newUser)
                }
            }
        }
    }

    onAppUpdated(cb: () => void): void {
        this.callbackPull.push(() => cb())
    }

    onUserIsSet(cb: (user: IPerson) => void): any {
        this.userIsSetCallBackPull.push(cb)
    }

    async authUserAsync(
        userName: string,
        password: string,
        authService: IAuthService
    ): Promise<IPerson | null> {
        const response = await authService.execute(userName, password)

        if (response.payload) {
            this.localStorageManagementSerice.setAuthData(
                response.payload.userId
            )

            const userData = await this.serverConnector.getUserById(
                response.payload.userId
            )

            if (userData.payload) {
                const person = this.personFactory.create(
                    response.payload.userId,
                    userData.payload.userName,
                    userData.payload.wallet
                )

                this.setUserLocally(person)

                console.log(this.user, 'tada')

                return person
            }
        }

        return null
    }

    getLocalUser(): IPerson | null {
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

    setUserLocally(user: IPerson): void {
        this.user = user

        // ---------

        this.userIsSetCallBackPull.forEach((callBack) => {
            callBack(user)
        })
    }

    static Instance(
        localStorageService: ILocalStorageManagementService,
        serverConnector: IServerConnector,
        eventService: IEventService
    ) {
        if (ApplicationSingletoneFacade.instance === null) {
            ApplicationSingletoneFacade.instance =
                new ApplicationSingletoneFacade(
                    localStorageService,
                    serverConnector,
                    eventService
                )
        }

        console.log({ instance: ApplicationSingletoneFacade.instance })
        return ApplicationSingletoneFacade.instance
    }

    addRequirementSchedule(task: ITask<IRequirementCommand, IPerson>) {}

    update() {}

    /* private  */ constructor(
        localStorageService: ILocalStorageManagementService,
        serverConnector: IServerConnector,
        eventService: IEventService
    ) {
        this.userIsSetCallBackPull = []
        this.personFactory = new PersonFactory()
        this.requriementManagementService = new RequrementManagementService(
            new RequirementFactory()
        )

        this.eventServise = eventService
        this.callbackPull = []
        this.updatingStatus = false
        this.localStorageManagementSerice = localStorageService
        this.serverConnector = serverConnector
        // this.users = []

        this.user = null

        console.log('app constructor ran')

        const authData = this.localStorageManagementSerice.getAuthData()

        if (authData) {
            this.updatingStatus = true
            this.serverConnector.getUserById(authData).then((response) => {
                const { payload, status } = response

                if (payload) {
                    const user = this.personFactory.create(
                        authData,
                        payload.userName,
                        payload.wallet
                    )

                    this.setUserLocally(user)
                }

                this.callbackPull.forEach((cb) => cb())
                this.updatingStatus = false
            })
        }

        // this.createUser()
    }
}
