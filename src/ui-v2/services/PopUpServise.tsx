export interface IPopUpService {
    push(elem: IPopUpElement): any
    getElems(): JSX.Element[]
}

export interface IPopUpElement {
    extract(): JSX.Element
    terminate(cb: () => void): void
    isTerminated(): boolean
}

export class PopUpElement {
    private ifTerminated: boolean
    elem: () => JSX.Element
    extract(): JSX.Element {
        return this.elem()
    }
    isTerminated(): boolean {
        return this.ifTerminated
    }
    terminate(cb: () => void): void {
        this.ifTerminated = true
    }

    constructor(elem: () => JSX.Element) {
        this.elem = elem
        this.ifTerminated = false
    }
}

export class PopUpService implements IPopUpService {
    private popUpPool: IPopUpElement[]

    push(elem: IPopUpElement): any {
        this.popUpPool.push(elem)
    }

    private update() {
        this.popUpPool = this.popUpPool.filter((elem) => !elem.isTerminated())
    }

    getElems(): JSX.Element[] {
        return this.popUpPool.map((elem) => {
            return (
                <div
                    onClick={() => {
                        elem.terminate(() => this.update())
                    }}
                >
                    {elem.extract()}
                </div>
            )
        })
    }

    constructor() {
        this.popUpPool = []
    }
}
