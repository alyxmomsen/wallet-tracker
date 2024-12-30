import { IWallet, Wallet } from '../Wallet'
import { ITransactionRequirementCommand } from '../requirement-command/RequirementCommand'
import { IRequirementStats } from '../requirement-command/interfaces'
import { GoingSleepStatus, IPersonStatusSystem } from './PersonStatus'
import { IPersonObserver, PersonObserver } from './observers/person-observer'

export type TStatus = {
    id: number
    title: string
}

export type TWalletTrackValue = {
    valueAfter: number
    valueBefore: number
    value: number
    executionDate: number
    transactionTypeCode: number
}

export interface IPerson {
    getWalletBalance(): number
    addRequirementCommand(
        requirementCommand: ITransactionRequirementCommand
    ): ITransactionRequirementCommand | null
    getRequirementCommandById(id: string): ITransactionRequirementCommand[]
    getActualRequirementCommands(): ITransactionRequirementCommand[]
    getAllReauirementCommands(): ITransactionRequirementCommand[]
    getExecutedRequirementCommands(): ITransactionRequirementCommand[]
    decrementWallet(value: number): void
    getName(): string
    incrementWallet(value: number): void
    getWalletTrackForActualRequirements(): TWalletTrackValue[]
    getStatusDescription(): string
    setStatus(status: IPersonStatusSystem): boolean
    onUpdate(cb: (user: IPerson) => any): any
    on(message: string, callBacks: (() => void)[]): void
    removeTransactionsToSyncAsStats(): Omit<IRequirementStats, 'userId'>[]
}

export abstract class Person implements IPerson {
    removeTransactionsToSyncAsStats(): Omit<IRequirementStats, 'userId'>[] {
        console.log('>>> remove requirements ::: started')

        const requirementsStatsArr = Array.from(
            this.requirementToSyncPool.entries()
        )
            .filter((elem) => {
                const [, poolElem] = elem

                if (poolElem.removed) return false

                return true
            })
            .map((elem) => {
                const [, poolElement] = elem

                console.log('>>> remove requirement ::: ', poolElement)

                console.log(
                    '>>> remove requirement :::: 2',
                    poolElement.data.getTransactionTypeCode
                )

                poolElement.removed = true

                const requirement = poolElement.data

                return {
                    cashFlowDirectionCode: requirement.getTransactionTypeCode(),
                    dateToExecute: requirement.getExecutionTimestamp(),
                    deleted: requirement.getDeletedTheState(),
                    description: requirement.getDescription(),
                    id: requirement.getId(),
                    isExecuted: requirement.checkIfExecuted(),
                    title: requirement.getTitle(),
                    value: requirement.getValue(),
                } as Omit<IRequirementStats, 'userId'>
            })

        return requirementsStatsArr
    }

    on(message: string, callBacks: (() => void)[]): void {
        this.subscribers.push({
            callBacksPool: callBacks,
            executedTimeStamp: 0,
            message,
        })
    }

    onUpdate(cb: (user: IPerson) => any): any {
        this.onUpdateObserver.addObserveable(cb)
    }

    getRequirementCommandById(id: string): ITransactionRequirementCommand[] {
        const requirements = this.requirementCommandsPool.filter((elem) => {
            return elem.getId() === id
        })

        return requirements
    }

    getStatusDescription(): string {
        return this.status.getDescription()
    }

    setStatus(status: IPersonStatusSystem): boolean {
        this.status = status
        return true
    }

    getWalletTrackForActualRequirements(): TWalletTrackValue[] {
        let balance = this.wallet.getBalance()

        return this.getActualRequirementCommands().map((requirement) => {
            const value = requirement.getValue()
            const valueBefore = balance
            const valueAfter = requirement.executeWithValue(balance)
            balance = valueAfter
            return {
                value,
                valueBefore,
                valueAfter,
                executionDate: requirement.getExecutionTimestamp(),
                transactionTypeCode: requirement.getTransactionTypeCode(),
            }
        })
    }
    getName(): string {
        return this.name
    }

    incrementWallet(value: number): void {
        this.wallet.add(value)
    }

    decrementWallet(value: number): void {
        this.wallet.remove(value)
    }

    addRequirementCommand(
        requirementCommand: ITransactionRequirementCommand
    ): ITransactionRequirementCommand | null {
        requirementCommand.subscribeOnUpdate((reqId: string) => {
            console.log('>>> add requirement id test :: id : ' + reqId)

            this.requirementToSyncPool.set(reqId, {
                removed: false,
                data: requirementCommand,
            })

            this.emitMessage('requirement-updated')
            console.log('>>> add requirement :: requirement updated')
        })

        this.requirementCommandsPool.push(requirementCommand)

        return requirementCommand
    }

    getWalletBalance(): number {
        return this.wallet.getBalance()
    }

    getActualRequirementCommands(): ITransactionRequirementCommand[] {
        return this.requirementCommandsPool.filter((requirementCommand) => {
            if (requirementCommand.checkIfExecuted()) {
                return false
            }

            const now = Date.now()

            // const requirementDateObj = getDateUtil(
            //     new Date(requirementCommand.getExecutionTimestamp())
            // )

            if (requirementCommand.getExecutionTimestamp() >= now) {
                return true
            }

            return false
        })
    }

    getAllReauirementCommands(): ITransactionRequirementCommand[] {
        return this.requirementCommandsPool
    }

    getExecutedRequirementCommands(): ITransactionRequirementCommand[] {
        return this.requirementCommandsPool.filter((elem) => {
            return !elem.checkIfExecuted()
        })
    }

    private emitMessage(message: string): void {
        this.subscribers.forEach((elem) => {
            if (elem.message === message) {
                elem.callBacksPool.forEach((callBack) => {
                    callBack()
                })
            }
        })
    }

    constructor(/* id: string,  */ wallet: IWallet, name: string) {
        this.onUpdateObserver = new PersonObserver()
        this.wallet = wallet
        this.name = name
        this.requirementCommandsPool = []
        this.averageSpending = 700
        this.status = new GoingSleepStatus()
        this.subscribers = []
        this.requirementToSyncPool = new Map<
            string,
            IPoolItem<ITransactionRequirementCommand>
        >()
    }

    protected name: string
    protected wallet: IWallet
    protected requirementCommandsPool: ITransactionRequirementCommand[]

    protected requirementToSyncPool: Map<
        string,
        IPoolItem<ITransactionRequirementCommand>
    >

    protected averageSpending: number
    protected status: IPersonStatusSystem
    private onUpdateObserver: IPersonObserver
    private subscribers: {
        executedTimeStamp: number
        message: string
        callBacksPool: (() => void)[]
    }[]
}

export class OrdinaryPerson extends Person {
    constructor(/* id: string,  */ name: string, walletInitValue: number) {
        super(/* id,  */ new Wallet(walletInitValue), name)
    }
}

export function getDateUtil(dateObj: Date): {
    date: number
    year: number
    month: number
} {
    const date = dateObj.getDate()
    const month = dateObj.getMonth()
    const year = dateObj.getFullYear()

    return {
        date,
        month,
        year,
    }
}

export interface IPoolItem<T> {
    removed: boolean
    data: T
}
