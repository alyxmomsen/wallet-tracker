import { networkInterfaces } from 'os'
import { IWallet, Wallet } from '../Wallet'
import { IRequirementCommand } from '../requirement-command/RequirementCommand'
import { GoingSleepStatus, IPersonStatusSystem } from './PersonStatus'
import { IUserData } from '../types/common'
import { RequirementFactory } from '../requirement-command/factories/RequirementFactory'
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
        requirementCommand: IRequirementCommand
    ): IRequirementCommand | null
    getRequirementCommandById(id: string): IRequirementCommand[]
    getActualRequirementCommands(): IRequirementCommand[]
    getAllReauirementCommands(): IRequirementCommand[]
    getExecutedRequirementCommands(): IRequirementCommand[]
    decrementWallet(value: number): void
    getName(): string
    incrementWallet(value: number): void
    getWalletTrackForActualRequirements(): TWalletTrackValue[]
    getStatusDescription(): string
    setStatus(status: IPersonStatusSystem): boolean
    onUpdate(cb: () => any): any
}

export abstract class Person implements IPerson {
    onUpdate(cb: () => any): any {
        this.onUpdateObserver.addObserveable(cb)
    }

    getRequirementCommandById(id: string): IRequirementCommand[] {
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
        requirementCommand: IRequirementCommand
    ): IRequirementCommand | null {
        for (const requirement of this.requirementCommandsPool) {
            const id = requirement.getId()

            requirementCommand.getId()
        }

        this.requirementCommandsPool.push(requirementCommand)

        return requirementCommand
    }

    getWalletBalance(): number {
        return this.wallet.getBalance()
    }

    getActualRequirementCommands(): IRequirementCommand[] {
        return this.requirementCommandsPool.filter((requirementCommand) => {
            if (requirementCommand.checkIfExecuted()) {
                return false
            }

            const currDateObj = getDateUtil(new Date())

            const requirementDateObj = getDateUtil(
                new Date(requirementCommand.getExecutionTimestamp())
            )

            if (
                requirementDateObj.year >= currDateObj.year &&
                requirementDateObj.month >= currDateObj.month &&
                requirementDateObj.date >= currDateObj.date
            ) {
                return true
            }

            return false
        })
    }

    getAllReauirementCommands(): IRequirementCommand[] {
        return this.requirementCommandsPool
    }

    getExecutedRequirementCommands(): IRequirementCommand[] {
        return this.requirementCommandsPool.filter((elem) => {
            return !elem.checkIfExecuted()
        })
    }

    constructor(/* id: string,  */ wallet: IWallet, name: string) {
        this.onUpdateObserver = new PersonObserver()
        this.wallet = wallet
        this.name = name
        this.requirementCommandsPool = []
        this.averageSpending = 700
        this.status = new GoingSleepStatus()
        // this.id = ''
    }

    // private password: string
    // protected id: string
    protected name: string
    protected wallet: IWallet
    protected requirementCommandsPool: IRequirementCommand[]
    // protected hungerLevel: number;
    // protected tiredLevel: number;
    // protected sleepLevel: number;
    protected averageSpending: number
    protected status: IPersonStatusSystem
    private onUpdateObserver: IPersonObserver

    private updateRequirements(requirements: IRequirementCommand[]): void {}

    private update(newData: IUserData): any {
        this.name = newData.userName
        this.wallet.setValue(newData.wallet)

        const requirements = newData.requirements
        const requirementFactory = new RequirementFactory()
        const newRequirementPool: IRequirementCommand[] = []

        requirements.forEach((requirement) => {
            const newRequirement = requirementFactory.create({
                ...requirement,
            })

            if (newRequirement) {
                newRequirementPool.push(newRequirement)
            }
        })

        this.requirementCommandsPool = newRequirementPool

        this.onUpdateObserver.execute()
    }
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
