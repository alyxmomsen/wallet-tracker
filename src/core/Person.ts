import { networkInterfaces } from 'os'
import { IWallet, Wallet } from './Wallet'
import { IRequirement } from './Requirement'
import { IRequirementCommand } from './RequirementCommand'

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
    getWalletTrackFor(): any[]
}

export abstract class Person implements IPerson {
    // private id: number;
    getWalletTrackFor(): any[] {
        let balance = this.wallet.getBalance()

        this.requirementCommands.map((requirement) => {
            // requirement.

            return requirement
        })

        return []
    }
    protected name: string
    protected wallet: IWallet
    protected requirementCommands: IRequirementCommand[]
    // protected hungerLevel: number;
    // protected tiredLevel: number;
    // protected sleepLevel: number;
    protected averageSpending: number

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

            function getDateUtil(dateObj: Date): {
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
