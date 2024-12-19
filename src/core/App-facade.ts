import {
    TFetchUserData,
    TUserRequirementStats,
} from '../ui-v2/login-window/RegistrationUI'
import { IEventService } from './events/App-event'
import { PersonFactory } from './person/factories/PersonFactory'
import { IPerson } from './person/Person'
import {
    IRequirementFactory,
    RequirementFactory,
} from './requirement-command/factories/RequirementFactory'
import { IRequirementFields } from './requirement-command/interfaces'
import { IRequirementCommand } from './requirement-command/RequirementCommand'
import { AuthUserService, IAuthService } from './services/auth-service'
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
    }: Omit<IRequirementFields, 'userId' | 'id'>): Promise<any>
    addRequirementSchedule(task: ITask<IRequirementCommand, IPerson>): void
    update(): void
    setUserLocally(user: IPerson): void
    // unsetUser(): any
    createUserRemote(
        userName: string,
        password: string,
        createUserService: ICreateUserService
    ): Promise<ICreateUserResponseData>
    getLocalUser(): IPerson | null
    authUserAsync(
        userName: string,
        password: string,
        authService: IAuthService
    ): Promise<IPerson | null>
    userLogin(userName: string, password: string): Promise<IPerson |null>
    userLogout(): any
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
    private localStorageManagementSerice: ILocalStorageManagementService
    private requriementManagementService: IRequirementManagementService
    private authUserService: IAuthService
    private updatingStatus: boolean
    private personFactory: PersonFactory
    private requirementFactory: IRequirementFactory
    // private otherUsers: IPerson[];
    private user: IPerson | null
    private static instance: ApplicationSingletoneFacade | null = null
    private eventServise: IEventService
    private serverConnector: IServerConnector
    private callbackPull: (() => void)[]
    private userIsSetCallBackPull: ((user: IPerson) => any)[]
    private userUnsetCallBackPull: (() => any)[]

    private updateRequirements(): void {}

    private unsetUser(): void {
        this.localStorageManagementSerice.unsetAuthData()

        this.user = null

        this.userUnsetCallBackPull.forEach((callback) => {
            callback()
        })
    }

    async userLogin(userName: string, password: string): Promise<IPerson |null> {
        const person = await this.authUserAsync(
            userName,
            password,
            this.authUserService
        )

        return person;
    }

    userLogout() {
        this.unsetUser()
        return true
    }

    onUserIsUnset(cb: () => any) {
        this.userUnsetCallBackPull.push(cb)
    }

    onUserUpdated(cb: () => any) {}

    async addRequirement({
        cashFlowDirectionCode,
        dateToExecute,
        description,
        isExecuted,
        title,
        value,
    }: Omit<IRequirementFields, 'userId' | 'id'>): Promise<any> {
        const authData = this.localStorageManagementSerice.getAuthData()
        if (authData) {
            const data =
                await this.requriementManagementService.createRequirement(
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
        this.callbackPull.push(cb)
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

            // если установка данных авторизации прошло успешно,
            // запрашиваем пользователя у бэк энд сервера

            const userData = await this.serverConnector.getUserById(
                response.payload.userId
            )

            if (userData.payload) {
                const person = this.personFactory.create(
                    response.payload.userId,
                    userData.payload.userName,
                    userData.payload.wallet
                )

                const requirementsData = userData.payload.requirements

                requirementsData.forEach((elem) => {
                    const requirementObject = this.requirementFactory.create({
                        ...elem,
                    })

                    if (requirementObject) {
                        person.addRequirementCommand(requirementObject)
                    }
                })

                this.setUserLocally(person)

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

        return ApplicationSingletoneFacade.instance
    }

    addRequirementSchedule(task: ITask<IRequirementCommand, IPerson>) {}

    update() {}

    /* private  */ constructor(
        localStorageService: ILocalStorageManagementService,
        serverConnector: IServerConnector,
        eventService: IEventService
    ) {
        // observer pulls

        this.userIsSetCallBackPull = []
        this.userUnsetCallBackPull = []

        // --

        this.personFactory = new PersonFactory()
        this.requirementFactory = new RequirementFactory()
        this.requriementManagementService = new RequrementManagementService(
            new RequirementFactory()
        )
        this.authUserService = new AuthUserService()

        this.eventServise = eventService
        this.callbackPull = []
        this.updatingStatus = false
        this.localStorageManagementSerice = localStorageService
        this.serverConnector = serverConnector
        // this.users = []

        this.user = null

        const authData = this.localStorageManagementSerice.getAuthData()

        if (authData) {
            this.updatingStatus = true
            this.serverConnector.getUserById(authData).then((response) => {
                const { payload, status } = response

                if (payload) {
                    const newUser: IPerson = this.personFactory.create(
                        authData,
                        payload.userName,
                        payload.wallet
                    )

                    const p = payload as TFetchUserData & {
                        requirements: IRequirementFields[]
                    }

                    p.requirements.forEach((elem) => {
                        //
                    })

                    const reqFactory = new RequirementFactory()

                    console.log(
                        'constructor requirements',
                        p.requirements,
                        payload
                    )

                    p.requirements.forEach((req) => {
                        const requirement = reqFactory.create({
                            ...req,
                        })

                        if (requirement)
                            newUser.addRequirementCommand(requirement)
                    })

                    this.setUserLocally(newUser)
                }

                this.callbackPull.forEach((cb) => cb())
                this.updatingStatus = false
            })
        }

        // this.createUser()
    }
}
