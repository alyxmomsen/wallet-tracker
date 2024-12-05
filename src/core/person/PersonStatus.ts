export interface IPersonStatusSystem {
    getDate(): number
    getDescription(): string
    getDifference(): number
}

abstract class PersonStatusSystem implements IPersonStatusSystem {
    protected id: number
    protected title: string
    protected date: number

    abstract getDate(): number

    getDifference(): number {
        return Date.now() - this.date
    }

    abstract getDescription(): string

    constructor(title: string, id: number) {
        this.title = title
        this.id = id
        this.date = Date.now()
    }
}

export class GoingSleepStatus extends PersonStatusSystem {
    getDate(): number {
        return this.date
    }

    getDescription(): string {
        return 'you sleep for ' + Math.floor(this.getDifference() / 1000)
    }

    constructor() {
        super('going to sleep', 0)
    }
}

export class AwakeningStatus extends PersonStatusSystem {
    getDate(): number {
        return this.date
    }

    getDescription(): string {
        return 'you awaken for ' + Math.floor(this.getDifference() / 1000)
    }

    constructor() {
        super('awakening', 1)
        this.date = Date.now()
    }
}

export abstract class PersonStatusFactory {
    abstract instance(): IPersonStatusSystem
}

export class AwakenStatusFactory {
    instance(): IPersonStatusSystem {
        return new AwakeningStatus()
    }
}
export class SlepStatusFactory {
    instance(): IPersonStatusSystem {
        return new GoingSleepStatus()
    }
}
