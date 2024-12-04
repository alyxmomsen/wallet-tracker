import { networkInterfaces } from 'os'
import { IWallet, Wallet } from './Wallet'
import { IRequirement } from './Requirement'
import { IRequirementCommand } from './RequirementCommand'

export type TWalletTrackValue = {
    valueAfter: number
    valueBefore: number
    value: number
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
}

export abstract class Person implements IPerson {
    // private id: number;
    protected name: string
    protected wallet: IWallet
    protected requirementCommands: IRequirementCommand[]
    // protected hungerLevel: number;
    // protected tiredLevel: number;
    // protected sleepLevel: number;
    protected averageSpending: number

    getWalletTrackForActualRequirements(): TWalletTrackValue[] {
        let balance = this.wallet.getBalance()

        return this.requirementCommands.filter((requirement) => {
            
            const currentDateObj = getDateUtil(new Date());
            const executeDate = getDateUtil(requirement.getExecuteDate());

            if (currentDateObj.year <= executeDate.year &&
                currentDateObj.month <= executeDate.month &&
                currentDateObj.date <= executeDate.date
            ) {

                return true
            }

            return false;

        }).map(elem => {

            const value = elem.getValue()
            const valueBefore = balance;
            const valueAfter = elem.executeWithValue(balance)
            balance = valueAfter;
            return {
                value,
                valueBefore,
                valueAfter,
            }
        });
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
            const currDateObj = getDateUtil(new Date())

            const requirementDateObj = getDateUtil(
                requirementCommand.getExecuteDate()
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

    constructor(wallet: IWallet, name: string) {
        this.wallet = wallet
        this.name = name
        this.requirementCommands = []
        this.averageSpending = 700
    }
}

export class OrdinaryPerson extends Person {
    constructor(name: string, walletInitValue: number) {
        super(new Wallet(walletInitValue), name)
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
