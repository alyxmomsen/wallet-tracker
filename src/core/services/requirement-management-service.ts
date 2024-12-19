import { TFetchResponse } from '../../ui-v2/login-window/RegistrationUI'
import { ServerBaseURL } from '../../ui-v2/PersonCardUI'
import { IRequirementFactory } from '../requirement-command/factories/RequirementFactory'
import { IRequirementFields } from '../requirement-command/interfaces'
import { IUserData } from '../types/common'

export interface IRequirementManagementService {
    createRequirement(
        fields: Omit<IRequirementFields, 'userId' | 'id'>,
        authToken: string
    ): Promise<TFetchResponse<IUserData>>
}

export class RequrementManagementService
    implements IRequirementManagementService
{
    requirementFactory: IRequirementFactory

    // private che

    async createRequirement(
        fields: Omit<IRequirementFields, 'userId'>,
        authToken: string
    ): Promise<TFetchResponse<IUserData>> {
        try {
            const body: Omit<IRequirementFields, 'userId'> = {
                ...fields,
            }

            const response = await fetch(
                ServerBaseURL + '/add-user-requirements-protected',
                {
                    headers: {
                        'content-type': 'application/json',
                        'x-auth': authToken,
                    },
                    body: JSON.stringify({
                        ...body,
                    }),
                    method: 'post',
                }
            )
            const data = (await response.json()) as TFetchResponse<IUserData>

            return data
        } catch (e) {
            return {
                payload: null,
                status: {
                    code: 343,
                    details: 'bad mood',
                },
            }
            console.error(e)
        }

        // this.requirementFactory.create('' ,);
    }
    constructor(factory: IRequirementFactory) {
        this.requirementFactory = factory
    }
}
