import { IRequirementStats } from '../interfaces'
import {
    DecrementMoneyRequirementCommand,
    IncrementMoneyRequirementCommand,
    ITransactionRequirementCommand,
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
        IRequirementStats,
        'isExecuted' | 'userId'
    >): ITransactionRequirementCommand | null
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
        IRequirementStats,
        'isExecuted' | 'userId'
    >): ITransactionRequirementCommand | null {
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
