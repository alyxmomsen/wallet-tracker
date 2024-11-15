import { IWallet, Wallet } from "./Wallet";

export interface IPerson {

}

export abstract class Person implements IPerson {
    // private id: number;
    protected name: string;
    protected wallet: IWallet;

    constructor(wallet:IWallet , name:string) {
        this.wallet = wallet;
        this.name = name;
        // this.id = 
    }
}

export class MainPerson extends Person {
    constructor(name:string) {
        super(new Wallet() , name);
    }
}
