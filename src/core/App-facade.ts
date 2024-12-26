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
import { IHTTPServerCommunicateService } from './services/server-connector-service-facade'

import { ITask } from './Task'
import { IUserData } from './types/common'

export interface IApplicationSingletoneFacade {
    executeTransactsionById(id: string): void
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
    createUserRemote(
        userName: string,
        password: string,
        createUserService: ICreateUserService
    ): Promise<ICreateUserResponseData>
    getLocalUserStats(): IPerson | null
    getUserStats():
        | (Omit<IUserData, 'id'> & {
              requirements: Omit<IRequirementStats, 'userId'>[]
          })
        | null
    userLogIn(userName: string, password: string): Promise<IPerson | null>
    userLogOut(): any
    onAppUpdate(cb: () => void): void
    onUserSet(
        cb: (
            user: Omit<IUserData, 'id'> & {
                requirements: Omit<IRequirementStats, 'userId'>[]
            }
        ) => void
    ): void
    onUserUpdate(cb: () => any): any
    subscriberOnMessage({
        callBacks,
        message,
    }: {
        message: string
        callBacks: (() => void)[]
        executedTimeStamp: number
    }): void
    // emitMessage(message: string): void
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
    executeTransactsionById(id: string): void {
        const user = this.user

        if (user === null) return

        console.log('>>> executeTransaction :: getting requirements...')
        const requirements = user.getAllReauirementCommands().filter((elem) => {
            return elem.getId() === id
        })

        if (requirements.length > 1)
            throw new Error('multiple items by Id: ' + id)

        if (requirements.length < 1)
            throw new Error('no transactions by Id: ' + id)

        const requirement = requirements[0]

        requirement.execute(user)

        console.log('>>> executeTransaction :: ', requirements)
        console.log('>>> executeTransaction :: user has been mutated')
    }

    async addRequirement({
        cashFlowDirectionCode,
        dateToExecute,
        description,
        isExecuted,
        title,
        value,
    }: Omit<IRequirementStats, 'userId' | 'id'>): Promise<any> {
        const authToken = this.browserLocalStorageManagementService.getAuthData()
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
        const authData = this.browserLocalStorageManagementService.getAuthData()

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

    async userLogIn(
        userName: string,
        password: string
    ): Promise<IPerson | null> {
        const log = loggerCreator(true, 'USER LOGGING')

        log('user loging')
        log(userName + ' | ' + password)

        const logInResponse =
            await this.HTTPServerComunicateService.getUserByUserNameAndPassword(
                userName,
                password
            )

        if (logInResponse.payload === null) {
            return null
        }

        const { name, wallet, requirements } = logInResponse.payload.userStats

        const newPerson = this.personFactory.create(name, wallet)

        for (const requirement of requirements) {
            const createdReauirement = this.requirementFactory.create({
                ...requirement,
            })

            if (createdReauirement === null) continue

            newPerson.addRequirementCommand(createdReauirement)
        }

        this.setUserLocally(newPerson)

        const token = logInResponse.payload.authToken

        this.browserLocalStorageManagementService.setAuthData(token)

        return newPerson
    }

    userLogOut() {
        this.unsetUser()
        return true
    }

    onUserIsUnset(cb: () => any) {
        this.userUnsetCallBackPull.push(cb)
    }

    onUserUpdate(cb: () => any) {}

    onAppUpdate(cb: () => void): void {
        this.callbackPull.push(cb)
    }

    onUserSet(
        cb: (
            user: Omit<IUserData, 'id'> & {
                requirements: Omit<IRequirementStats, 'userId'>[]
            }
        ) => void
    ): any {
        this.userIsSetCallBackPull.push(cb)
    }

    getLocalUserStats(): IPerson | null {
        if (this.user === null) {
            return null
        }

        return this.user
    }

    getUserStats():
        | (Omit<IUserData, 'id'> & {
              requirements: Omit<IRequirementStats, 'userId'>[]
          })
        | null {
        if (this.user === null) {
            return null
        }

        const stats: Omit<IUserData, 'id'> & {
            requirements: Omit<IRequirementStats, 'userId'>[]
        } = {
            name: this.user.getName(),
            wallet: this.user.getWalletBalance(),
            requirements: this.user
                .getAllReauirementCommands()
                .map((transactinRequirement) => ({
                    cashFlowDirectionCode:
                        transactinRequirement.getTransactionTypeCode(),
                    dateToExecute:
                        transactinRequirement.getExecutionTimestamp(),
                    deleted: transactinRequirement.getDeletedTheState(),
                    description: transactinRequirement.getDescription(),
                    id: transactinRequirement.getId(),
                    isExecuted: transactinRequirement.checkIfExecuted(),
                    title: transactinRequirement.getTitle(),
                    value: transactinRequirement.getValue(),
                })),
        }

        return stats
    }

    async createUserRemote(
        userName: string,
        password: string,
        createUserService: ICreateUserService
    ): Promise<ICreateUserResponseData> {
        return createUserService.execute(userName, password)
    }

    subscriberOnMessage({
        callBacks,
        message,
    }: {
        message: string
        callBacks: (() => void)[]
    }): void {
        this.subscribers.push({ callBacks, message, executedTimeStamp: 0 })
    }

    private emitMessage(message: string): void {
        this.subscribers.forEach((subscriber) => {
            if (subscriber.message === message) {
                subscriber.callBacks.forEach((callBack) => {
                    callBack()
                })
            }
        })
    }

    private setUserLocally(user: IPerson): void {
        this.user = user

        // ---------

        user.on('requirement-updated', [
            () => this.emitMessage('updated'),
            () => {
                const userStats = this.getUserStats()

                if (userStats === null) {
                    return
                }

                this.HTTPServerComunicateService.pushUserDataStats(
                    userStats,
                    this.browserLocalStorageManagementService
                )
            },
        ])

        this.user.onUpdate((user: IPerson) => {})

        this.userIsSetCallBackPull.forEach((callBack) => {
            const userData = this.getUserStats()
            if (userData) {
                callBack(userData)
            }
        })
    }

    static Instance(
        localStorageService: ILocalStorageManagementService,
        serverConnector: IHTTPServerCommunicateService,
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

    private subscribers: {
        message: string
        callBacks: (() => void)[]
        executedTimeStamp: number
    }[]
    private browserLocalStorageManagementService: ILocalStorageManagementService
    private requriementManagementService: IRequirementManagementService
    private authUserService: IAuthService
    private updatingStatus: boolean
    private personFactory: PersonFactory
    private requirementFactory: IRequirementFactory

    private user: IPerson | null
    private static instance: ApplicationSingletoneFacade | null = null
    private eventServise: IEventService
    private HTTPServerComunicateService: IHTTPServerCommunicateService
    private callbackPull: (() => void)[]
    private userIsSetCallBackPull: ((
        user: Omit<IUserData, 'id'> & {
            requirements: Omit<IRequirementStats, 'userId'>[]
        }
    ) => any)[]
    private userUnsetCallBackPull: (() => any)[]

    private updateRequirements(): void {}

    private unsetUser(): void {
        this.browserLocalStorageManagementService.unsetAuthData()

        this.user = null

        this.userUnsetCallBackPull.forEach((callback) => {
            callback()
        })
    }

    /* private  */ constructor(
        localStorageService: ILocalStorageManagementService,
        serverConnector: IHTTPServerCommunicateService,
        eventService: IEventService
    ) {
        // subscribers

        this.subscribers = []

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
        this.browserLocalStorageManagementService = localStorageService
        this.HTTPServerComunicateService = serverConnector

        this.user = null

        const authData = this.browserLocalStorageManagementService.getAuthData()

        if (authData) {
            this.updatingStatus = true

            this.HTTPServerComunicateService
                .getUserByAuthToken(authData)
                .then((response) => {
                    const responsedPayload = response.payload

                    if (responsedPayload !== null) {
                        this.browserLocalStorageManagementService.setAuthData(
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

                        const log__user = this.getUserStats()

                        console.log(
                            '>>> app constructor ::  user name: ' +
                                log__user?.name
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
