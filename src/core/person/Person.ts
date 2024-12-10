import { networkInterfaces } from 'os'
import { IWallet, Wallet } from '../Wallet'
import { IRequirementCommand } from '../RequirementCommand'
import { GoingSleepStatus, IPersonStatusSystem } from './PersonStatus'

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
    update(): void
    getWalletBalance(): number
    addRequirementCommand(
        requirementCommand: IRequirementCommand
    ): IRequirementCommand | null
    getActualRequirementCommands(): IRequirementCommand[]
    getAllReauirementCommands(): IRequirementCommand[]
    getExecutedRequirementCommands(): IRequirementCommand[]
    decrementWallet(value: number): void
    getName(): string
    incrementWallet(value: number): void
    getWalletTrackForActualRequirements(): TWalletTrackValue[]
    getStatusDescription(): string
    setStatus(status: IPersonStatusSystem): boolean
    getId(): string
    setId(id: string): string
    getPassword(): string
}

export abstract class Person implements IPerson {
    private id: string
    // private password: string
    protected name: string
    protected wallet: IWallet
    protected requirementCommands: IRequirementCommand[]
    // protected hungerLevel: number;
    // protected tiredLevel: number;
    // protected sleepLevel: number;
    protected averageSpending: number
    protected status: IPersonStatusSystem

    getPassword(): string {
        // return this.password
        return ''
    }

    setId(id: string): string {
        this.id = id
        return this.id
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
                executionDate: Number.parseInt(
                    requirement
                        .getExecutionDate()
                        .getTime() /* / 1000 */
                        .toString()
                ),
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
        this.requirementCommands.push(requirementCommand)

        return requirementCommand
    }

    getWalletBalance(): number {
        return this.wallet.getBalance()
    }

    update() {}

    getActualRequirementCommands(): IRequirementCommand[] {
        return this.requirementCommands.filter((requirementCommand) => {
            if (requirementCommand.checkIfExecuted()) {
                return false
            }

            const currDateObj = getDateUtil(new Date())

            const requirementDateObj = getDateUtil(
                requirementCommand.getExecutionDate()
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
        return this.requirementCommands
    }

    getExecutedRequirementCommands(): IRequirementCommand[] {
        return this.requirementCommands.filter((elem) => {
            return !elem.checkIfExecuted()
        })
    }

    getId() {
        return this.id
    }

    constructor(
        wallet: IWallet,
        name: string,
        id: string /* , password: string */
    ) {
        this.id = id
        // this.password = password
        this.wallet = wallet
        this.name = name
        this.requirementCommands = []
        this.averageSpending = 700
        this.status = new GoingSleepStatus()
    }
}

export class OrdinaryPerson extends Person {
    constructor(
        name: string,
        walletInitValue: number,
        id: string
        /* pass: string */
    ) {
        super(new Wallet(walletInitValue), name, id /* , pass */)
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
