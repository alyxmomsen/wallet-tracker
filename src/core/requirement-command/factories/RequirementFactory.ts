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
        isExecuted,
        deleted,
    }: Omit<IRequirementStats, 'userId'>): ITransactionRequirementCommand | null
}

export class RequirementFactory implements IRequirementFactory {
    create({
        id,
        value,
        title,
        description,
        dateToExecute,
        cashFlowDirectionCode,
        deleted,
        isExecuted,
    }: Omit<
        IRequirementStats,
        'userId'
    >): ITransactionRequirementCommand | null {
        switch (cashFlowDirectionCode) {
            case 1:
                return new IncrementMoneyRequirementCommand(
                    id,
                    value,
                    title,
                    description,
                    dateToExecute,
                    isExecuted
                )
                break
            case 0:
                return new DecrementMoneyRequirementCommand(
                    id,
                    value,
                    title,
                    description,
                    dateToExecute,
                    isExecuted
                )
                break

            default:
                return null
                break
        }
    }

    constructor() {}
}
