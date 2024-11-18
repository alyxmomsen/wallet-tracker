import { networkInterfaces } from 'os'
import { IWallet, Wallet } from './Wallet'
import { IRequirement } from './Requirement'

export interface IPerson {
    // update(): void
    getWalletBalance(): number
    addRequirement(requirement: IRequirement): IRequirement | null
    getActualRequirements(): IRequirement[]
}

export abstract class Person implements IPerson {
    // private id: number;
    protected name: string
    protected wallet: IWallet
    protected requirements: IRequirement[]
    // protected hungerLevel: number;
    // protected tiredLevel: number;
    // protected sleepLevel: number;

    addRequirement(requirement: IRequirement): IRequirement | null {
        this.requirements.push(requirement)
        return null
    }

    getWalletBalance(): number {
        return this.wallet.getBalance()
    }

    update() {}

    getActualRequirements(): IRequirement[] {
        return this.requirements.filter((el) => {
            return el.checkIfActual()
        })
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
