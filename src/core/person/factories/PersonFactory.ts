import { IPerson, OrdinaryPerson } from '../Person'

export interface IPersonFacory {
    create(id: string, name: string, walletInitValue: number): IPerson
}

export class PersonFactory implements IPersonFacory {
    create(id: string, name: string, walletInitValue: number): IPerson {
        return new OrdinaryPerson(id, name, walletInitValue)
    }

    constructor() {}
}
