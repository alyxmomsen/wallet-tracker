export interface IPage {
    getElement(): JSX.Element
}

export class Page {
    private element: JSX.Element

    getElement() {
        return this.element
    }

    constructor(elem: JSX.Element) {
        this.element = elem
    }
}
