import { networkInterfaces } from 'os'
import { IWallet, Wallet } from './Wallet'
import { IRequirement } from './Requirement'

export interface IPerson {
    update(): void
    getWalletBalance(): number
    addRequirement(requirement: IRequirement): IRequirement | null
    getActualRequirements(): IRequirement[]
    getAllReauirements(): IRequirement[]
    getExecutedRequirements(): IRequirement[]
    decrementWallet(value: number): void
    getName(): string
    incrementWallet(value: number): void
}

export abstract class Person implements IPerson {
    // private id: number;
    protected name: string
    protected wallet: IWallet
    protected requirements: IRequirement[]
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

    addRequirement(requirement: IRequirement): IRequirement | null {
        this.requirements.push(requirement)
        return null
    }

    getWalletBalance(): number {
        return this.wallet.getBalance()
    }

    update() {
        this.requirements.forEach((requirement) => {
            if (requirement) {
            }
        })
    }

    getActualRequirements(): IRequirement[] {
        return this.requirements.filter((requirement) => {
            return requirement.checkIfActual()
        })
    }

    getAllReauirements(): IRequirement[] {
        return this.requirements
    }

    getExecutedRequirements(): IRequirement[] {
        return this.requirements.filter((elem) => {
            return !elem.checkIfActual()
        })
    }

    constructor(wallet: IWallet, name: string) {
        this.wallet = wallet
        this.name = name
        this.requirements = []
        this.averageSpending = 700
    }
}

export class OrdinaryPerson extends Person {
    constructor(name: string, walletInitValue: number) {
        super(new Wallet(walletInitValue), name)
    }
}
