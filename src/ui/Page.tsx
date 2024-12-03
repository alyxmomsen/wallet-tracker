export interface IPage {
    exec(): JSX.Element
}

export class Page implements IPage {
    private element: JSX.Element

    exec() {
        return this.element
    }

    constructor(elem: JSX.Element) {
        this.element = elem
    }
}
