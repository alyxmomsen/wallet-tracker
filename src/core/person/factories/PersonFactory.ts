import { OrdinaryPerson } from '../Person'

export class PersonFactory {
    create(id:string ,name: string, walletInitValue: number) {
        

        return new OrdinaryPerson(id, name, walletInitValue)
    }

    constructor() {}
}
