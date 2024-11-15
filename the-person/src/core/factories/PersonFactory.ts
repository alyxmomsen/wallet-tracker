import { IPerson, MainPerson, Person } from "../Person";
import { Factory } from "./AbstractFactory";

export abstract class PersonFactory extends Factory<IPerson> {

    
    abstract create(name:string):IPerson;

    constructor() {
        super();
    }
}

export class PlayerPersonFactory extends PersonFactory {

    create(name:string): IPerson {
        return new MainPerson(name);
    }

}