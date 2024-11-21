import { networkInterfaces } from 'os'
import { IWallet, Wallet } from './Wallet'
import { IRequirement } from './Requirement'

export interface IPerson {
    update(): void
    getWalletBalance(): number
    addRequirement(requirement: IRequirement): IRequirement | null
    getActualRequirements(): IRequirement[]
    decrementWallet(value: number): void
    getName():string
}

export abstract class Person implements IPerson {
    // private id: number;
    protected name: string
    protected wallet: IWallet
    protected requirements: IRequirement[]
    // protected hungerLevel: number;
    // protected tiredLevel: number;
    // protected sleepLevel: number;

    getName(): string {
        return this.name;
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

    constructor(wallet: IWallet, name: string) {
        this.wallet = wallet
        this.name = name
        this.requirements = []
    }
}

export class MainPerson extends Person {
    constructor(name: string) {
        super(new Wallet(20_000), name)
    }
}
