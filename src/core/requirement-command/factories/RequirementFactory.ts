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
        date,
        flowDirectionCode,
    }: {
        id: string
        value: number
        title: string
        description: string
        date: number
        flowDirectionCode: number
    }): IRequirementCommand | null
}

export class RequirementFactory implements IRequirementFactory {
    create({
        id,
        value,
        title,
        description,
        date,
        flowDirectionCode,
    }: {
        id: string
        value: number
        title: string
        description: string
        date: number
        flowDirectionCode: number
    }): IRequirementCommand | null {
        switch (flowDirectionCode) {
            case 0:
                return new IncrementMoneyRequirementCommand(
                    id,
                    value,
                    title,
                    description,
                    date
                )
                break
            case 1:
                return new DecrementMoneyRequirementCommand(
                    id,
                    value,
                    title,
                    description,
                    date
                )
                break

            default:
                return null
                break
        }
    }

    constructor() {}
}
