import { IRequirementFactory } from "../requirement-command/factories/RequirementFactory";

export interface IRequirementManagementService {

    create(): void;
    
}

export class RequrementManagementService implements IRequirementManagementService {

    requirementFactory: IRequirementFactory;
    create(): void {


        // this.requirementFactory.create('' ,);
    }
    constructor(factory:IRequirementFactory) {
        this.requirementFactory = factory;
    }
}