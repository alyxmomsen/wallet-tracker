import { networkInterfaces } from 'os'
import { IWallet, Wallet } from './Wallet'

export interface IPerson {
    addPassive(passive: Passive): void
    update(): void
    getWalletBalance(): number
}

export abstract class IPassiveExecutorBehavior {
    abstract try(lastExecuted: number, timeToCheck: number): boolean
}

export class EveryDayPassiveExecutorBehavior extends IPassiveExecutorBehavior {
    private hoursTo: number
    private minutesTo: number

    try(lastExecuted: number, timeToCheck: number): boolean {
        const lastExecutedDateObj = new Date(lastExecuted)

        const daysInterval = 1

        const dateOfLastExec = lastExecutedDateObj.getDate()
        const dateTo = new Date(lastExecuted)
        dateTo.setDate(dateOfLastExec + daysInterval)
        dateTo.setHours(this.hoursTo)
        dateTo.setMinutes(this.minutesTo)

        const timeToCheckDateObj = new Date(timeToCheck)

        if (timeToCheckDateObj.getTime() >= dateTo.getTime()) {
            return true
        }

        return false
    }

    constructor(h: number, m: number) {
        super()
        this.hoursTo = h
        this.minutesTo = m
    }
}

export class Passive {
    private lastExecutedUnixTime: number

    private passiveExecutorBehavior: IPassiveExecutorBehavior

    private valueToApply: number

    execute(wallet: IWallet) {
        const result = this.passiveExecutorBehavior.try(
            this.lastExecutedUnixTime,
            Date.now()
        )

        if (result) {
            wallet.remove(this.valueToApply)
            this.lastExecutedUnixTime = Date.now()
        }
    }

    constructor(value: number, execBehavior: IPassiveExecutorBehavior) {
        this.valueToApply = value
        this.passiveExecutorBehavior = execBehavior

        const currentDateObj = new Date()
        const currentDate = currentDateObj.getDate()
        currentDateObj.setDate(currentDate - 1)
        this.lastExecutedUnixTime = currentDateObj.getTime()
    }
}

export abstract class Person implements IPerson {
    // private id: number;
    protected name: string
    protected wallet: IWallet
    protected passives: Passive[]

    addPassive(passive: Passive) {
        this.passives.push(passive)
    }

    update() {
        for (const passive of this.passives) {
            passive.execute(this.wallet)
        }
    }

    getWalletBalance(): number {
        return this.wallet.getBalance()
    }

    constructor(wallet: IWallet, name: string) {
        this.wallet = wallet
        this.name = name
        this.passives = []
    }
}

export class MainPerson extends Person {
    constructor(name: string) {
        super(new Wallet(20_000), name)
    }
}
