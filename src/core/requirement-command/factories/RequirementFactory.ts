import { IRequirementFields } from '../interfaces'
import {
    DecrementMoneyRequirementCommand,
    IncrementMoneyRequirementCommand,
    IRequirementCommand,
} from '../RequirementCommand'

export interface IRequirementFactory {
    create({
        id,
        value,
        title,
        description,
        dateToExecute,
        cashFlowDirectionCode,
    }: Omit<
        IRequirementFields,
        'isExecuted' | 'userId'
    >): IRequirementCommand | null
}

export class RequirementFactory implements IRequirementFactory {
    create({
        id,
        value,
        title,
        description,
        dateToExecute,
        cashFlowDirectionCode,
    }: Omit<
        IRequirementFields,
        'isExecuted' | 'userId'
    >): IRequirementCommand | null {
        switch (cashFlowDirectionCode) {
            case 0:
                return new IncrementMoneyRequirementCommand(
                    id,
                    value,
                    title,
                    description,
                    dateToExecute
                )
                break
            case 1:
                return new DecrementMoneyRequirementCommand(
                    id,
                    value,
                    title,
                    description,
                    dateToExecute
                )
                break

            default:
                return null
                break
        }
    }

    constructor() {}
}
