import { ServerBaseURL } from '../../ui-v2/PersonCardUI'
import { IRequirementFactory } from '../requirement-command/factories/RequirementFactory'
import { IRequirementFields } from '../requirement-command/interfaces'

export interface IRequirementManagementService {
    create(
        {
            cashFlowDirectionCode,
            dateToExecute,
            description,
            isExecuted,
            title,
            userId,
            value,
        }: IRequirementFields,
        authToken: string
    ): Promise<void>
}

export class RequrementManagementService
    implements IRequirementManagementService
{
    requirementFactory: IRequirementFactory

    // private che

    async create(
        {
            cashFlowDirectionCode,
            dateToExecute,
            description,
            isExecuted,
            title,
            userId,
            value,
        }: IRequirementFields,
        authToken: string
    ): Promise<void> {
        const response = await fetch(
            ServerBaseURL + '/add-requirement-protected-ep',
            {
                headers: {
                    'content-type': 'application/json',
                    'x-auth': authToken,
                },
                body: JSON.stringify({
                    cashFlowDirectionCode,
                    dateToExecute,
                    description,
                    isExecuted,
                    title,
                    userId,
                    value,
                }),
                method: 'post',
            }
        )

        // this.requirementFactory.create('' ,);
    }
    constructor(factory: IRequirementFactory) {
        this.requirementFactory = factory
    }
}
