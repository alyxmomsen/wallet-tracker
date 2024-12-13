import {
    DecrementMoneyRequirementCommand,
    IncrementMoneyRequirementCommand,
} from '../RequirementCommand'

class RequirementFactory {
    create(
        value: number,
        title: string,
        description: string,
        date: number,
        flowDirectionCode: number
    ) {
        switch (flowDirectionCode) {
            case 0:
                return new IncrementMoneyRequirementCommand(
                    value,
                    title,
                    description,
                    date
                )
                break
            case 1:
                return new DecrementMoneyRequirementCommand(
                    value,
                    title,
                    description,
                    date
                )
                break

            default:
                break
        }
    }

    constructor() {}
}
