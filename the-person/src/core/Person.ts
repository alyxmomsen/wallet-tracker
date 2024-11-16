import { networkInterfaces } from 'os'
import { IWallet, Wallet } from './Wallet'
import { IRequirement } from './Requirement'

export interface IPerson {
    // update(): void
    getWalletBalance(): number
    addRequirement(requirement: IRequirement): IRequirement | null
}

export abstract class Person implements IPerson {
    // private id: number;
    protected name: string
    protected wallet: IWallet
    protected requirements: IRequirement[]
    // protected hungerLevel: number;
    // protected tiredLevel: number;
    // protected sleepLevel: number;

    getWalletBalance(): number {
        return this.wallet.getBalance()
    }

    addRequirement(requirement: IRequirement): IRequirement | null {
        const lengthBefore = this.requirements.length
        const lengthAfter = this.requirements.push(requirement)

        if (lengthAfter > lengthBefore) {
            return requirement
        }

        return null
    }

    update() {
        for (const requirement of this.requirements) {
        }
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
