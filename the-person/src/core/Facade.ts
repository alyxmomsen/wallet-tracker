import { IPerson, MainPerson } from "./Person";

export interface IFacade {
    addPerson(): number;
}

export class Facade {

    // uniqIdRegistry:Map<number>

    private persons: IPerson[];
    private personsRegisty: Map<number ,IPerson>;

    addPerson(person:IPerson) {
        // this.personsRegisty.set(person);
    }

    constructor() {
        this.persons = [];
        this.personsRegisty = new Map<number, IPerson>;
        
        this.addPerson(new MainPerson('Player'));
    }
}