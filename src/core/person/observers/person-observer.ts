export interface IPersonObserver {
    execute(): any
    addObserveable(cb: () => any): any
}

export class PersonObserver implements IPersonObserver {
    private observeables: (() => any)[]

    addObserveable(cb: () => any): any {
        this.observeables.push(cb)
    }

    execute(): any {
        this.observeables.forEach((elem) => {
            elem()
        })
    }

    constructor() {
        this.observeables = []
    }
}
