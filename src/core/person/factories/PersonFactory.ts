import { OrdinaryPerson } from '../Person'

export class PersonFactory {
    execute(name: string, walletInitValue: number /* , pass: string */) {
        const newId = (
            Date.now() + Math.floor(Math.random() * 1000)
        ).toLocaleString()

        return new OrdinaryPerson(name, walletInitValue)
    }

    constructor() {}
}
