import { IEventService } from './events/App-event'
import { PersonFactory } from './person/factories/PersonFactory'
import { IPerson } from './person/Person'
import {
    IRequirementFactory,
    RequirementFactory,
} from './requirement-command/factories/RequirementFactory'
import { IRequirementStats } from './requirement-command/interfaces'
import { ITransactionRequirementCommand } from './requirement-command/RequirementCommand'
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
    // executeTransaction(): void;
    deleteRequirement(
        reqId: string
    ): Promise<Pick<IRequirementStats, 'id'> | null>
    addRequirement({
        cashFlowDirectionCode,
        dateToExecute,
        description,
        isExecuted,
        title,
        value,
    }: Omit<IRequirementStats, 'userId' | 'id' | 'deleted'>): Promise<any>
    addRequirementSchedule(
        task: ITask<ITransactionRequirementCommand, IPerson>
    ): void
    update(): void
    setUserLocally(user: IPerson): void

    createUserRemote(
        userName: string,
        password: string,
        createUserService: ICreateUserService
    ): Promise<ICreateUserResponseData>
    getLocalUser(): IPerson | null
    userLogin(userName: string, password: string): Promise<IPerson | null>
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

// в токене кодируется userId
export interface ICheckAuthTokenResponseData {
    token: string
}

export class ApplicationSingletoneFacade
    implements IApplicationSingletoneFacade
{
    async addRequirement({
        cashFlowDirectionCode,
        dateToExecute,
        description,
        isExecuted,
        title,
        value,
    }: Omit<IRequirementStats, 'userId' | 'id'>): Promise<any> {
        const authToken = this.localStorageManagementService.getAuthData()
        if (authToken) {
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
                    authToken
                )

            if (data.payload) {
                const newUser = this.personFactory.create(
                    data.payload.name,
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

    async deleteRequirement(
        reqId: string
    ): Promise<Pick<IRequirementStats, 'id'> | null> {
        const log = loggerCreator(
            true
            // && false
        )

        log('try delete the requirement')
        log('req id: ' + reqId)
        const authData = this.localStorageManagementService.getAuthData()

        if (authData === null) {
            log('localstorage failed')
            return null
        }

        log('local storage: ' + authData)

        const response =
            await this.requriementManagementService.deleteRequirement(
                reqId,
                authData,
                this.authUserService
            )

        if (response.payload === null) {
            log('payload failed')
            return null
        }

        log('payload: ' + response.payload.requirementId)

        return { id: response.payload.requirementId }
    }

    async userLogin(
        userName: string,
        password: string
    ): Promise<IPerson | null> {
        const log = loggerCreator(true, 'USER LOGGING')

        log('user loging')
        log(userName + ' | ' + password)

        const loginResponse =
            await this.serverConnector.getUserByUserNameAndPassword(
                userName,
                password
            )

        if (loginResponse.payload === null) {
            return null
        }

        const { name, wallet, requirements } = loginResponse.payload.userStats

        const newPerson = this.personFactory.create(name, wallet)

        for (const requirement of requirements) {
            const createdReauirement = this.requirementFactory.create({
                ...requirement,
            })

            if (createdReauirement === null) continue

            newPerson.addRequirementCommand(createdReauirement)
        }

        this.setUserLocally(newPerson)

        const token = loginResponse.payload.authToken

        this.localStorageManagementService.setAuthData(token)

        return newPerson
    }

    userLogout() {
        this.unsetUser()
        return true
    }

    onUserIsUnset(cb: () => any) {
        this.userUnsetCallBackPull.push(cb)
    }

    onUserUpdated(cb: () => any) {}

    onAppUpdated(cb: () => void): void {
        this.callbackPull.push(cb)
    }

    onUserIsSet(cb: (user: IPerson) => void): any {
        this.userIsSetCallBackPull.push(cb)
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

        this.user.onUpdate((user: IPerson) => {
            this.setUserLocally(user)
        })

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

    addRequirementSchedule(
        task: ITask<ITransactionRequirementCommand, IPerson>
    ) {}

    update() {}

    private localStorageManagementService: ILocalStorageManagementService
    private requriementManagementService: IRequirementManagementService
    private authUserService: IAuthService
    private updatingStatus: boolean
    private personFactory: PersonFactory
    private requirementFactory: IRequirementFactory

    private user: IPerson | null
    private static instance: ApplicationSingletoneFacade | null = null
    private eventServise: IEventService
    private serverConnector: IServerConnector
    private callbackPull: (() => void)[]
    private userIsSetCallBackPull: ((user: IPerson) => any)[]
    private userUnsetCallBackPull: (() => any)[]

    private updateRequirements(): void {}

    private unsetUser(): void {
        this.localStorageManagementService.unsetAuthData()

        this.user = null

        this.userUnsetCallBackPull.forEach((callback) => {
            callback()
        })
    }

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
        this.localStorageManagementService = localStorageService
        this.serverConnector = serverConnector
        // this.users = []

        this.user = null

        const authData = this.localStorageManagementService.getAuthData()

        if (authData) {
            this.updatingStatus = true
            // this.serverConnector.getUserById(authData).then((response) => {
            //     const { payload, status } = response

            //     if (payload) {
            //         const newUser: IPerson = this.personFactory.create(
            //             authData,
            //             payload.userName,
            //             payload.wallet
            //         )

            //         const p = payload as TFetchUserData & {
            //             requirements: IRequirementStats[]
            //         }

            //         p.requirements.forEach((elem) => {
            //             //
            //         })

            //

            //         const reqFactory = new RequirementFactory()

            //         console.log(
            //             'constructor requirements',
            //             p.requirements,
            //             payload
            //         )

            //         p.requirements.forEach((req) => {
            //             const requirement = reqFactory.create({
            //                 ...req,
            //             })

            //             if (requirement)
            //                 newUser.addRequirementCommand(requirement)
            //         })

            //         this.setUserLocally(newUser)
            //     }

            //     this.callbackPull.forEach((cb) => cb())
            //     this.updatingStatus = false
            // })
            this.serverConnector
                .getUserByAuthToken(authData)
                .then((response) => {
                    const responsedPayload = response.payload

                    if (responsedPayload !== null) {
                        this.localStorageManagementService.setAuthData(
                            responsedPayload.authToken
                        )

                        const user = this.personFactory.create(
                            responsedPayload.userStats.name,
                            responsedPayload.userStats.wallet
                        )

                        console.log(
                            '>>> server-connector :: created user',
                            user
                        )

                        responsedPayload.userStats.requirements.forEach(
                            (elem) => {
                                const requirementInitData: Omit<
                                    IRequirementStats,
                                    'isExecuted' | 'userId'
                                > = elem

                                const createdRequirement =
                                    this.requirementFactory.create(
                                        requirementInitData
                                    )

                                if (createdRequirement !== null) {
                                    user.addRequirementCommand(
                                        createdRequirement
                                    )
                                }
                            }
                        )

                        this.setUserLocally(user)

                        const log__user = this.getLocalUser()

                        console.log(
                            '>>> app constructor ::  user name: ' +
                                log__user?.getName()
                        )
                    }
                })
        }

        // this.createUser()
    }
}

export function loggerCreator(
    isOn: boolean,
    titleValue: string = 'unnamed log'
) {
    const title = titleValue

    return (data: string) => {
        if (isOn) {
            console.log(`>>> ${title} >>> ${data}`)
        }
    }
}
