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
            value,
        }: Omit<IRequirementFields, 'userId'>,
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
            value,
        }: Omit<IRequirementFields, 'userId'>,
        authToken: string
    ): Promise<void> {
        try {
            const response = await fetch(
                ServerBaseURL + '/add-user-requirements-protected',
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
                        value,
                    }),
                    method: 'post',
                }
            )
            const data = await response.json()
            console.log('requrement data response', data)
        } catch (e) {}

        // this.requirementFactory.create('' ,);
    }
    constructor(factory: IRequirementFactory) {
        this.requirementFactory = factory
    }
}
