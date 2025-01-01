import { TFetchResponse } from '../../ui-v2/login-window/RegistrationUI'
import { ServerBaseURL } from '../../ui-v2/user-card/PersonCardUI'
import { IRequirementFactory } from '../requirement-command/factories/RequirementFactory'
import { IRrequirementsStatsType } from '../requirement-command/interfaces'
import { IUserStats } from '../types/common'
import { IAuthService } from './auth-service'

export interface IRequirementManagementService {
    createRequirement(
        fields: Omit<
            IRrequirementsStatsType,
            | 'id'
            | 'userId'
            | 'createdTimeStamp'
            | 'updatedTimeStamp'
            | 'deleted'
            | 'executed'
        >,
        authToken: string
    ): Promise<
        TFetchResponse<
            IUserStats & {
                requirements: Omit<
                    IRrequirementsStatsType,
                    'userId' | 'deleted'
                >[]
            }
        >
    >

    deleteRequirement(
        reqId: string,
        authToken: string,
        checkAuthMiddleWare: IAuthService
    ): Promise<
        TFetchResponse<{
            requirementId: string
        }>
    >
}

export class RequrementManagementService
    implements IRequirementManagementService
{
    async deleteRequirement(
        reqId: string,
        authToken: string,
        checkAuthMiddleWare: IAuthService
    ): Promise<
        TFetchResponse<{
            requirementId: string
        }>
    > {
        // const checkAuthResponse = await checkAuthMiddleWare.checkAuth(authToken)

        const response = await fetch(
            ServerBaseURL + '/delete-requirement-protected-ep',
            {
                headers: {
                    'x-auth': authToken,
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    requirementId: reqId,
                }),
                method: 'post',
            }
        )

        const data = (await response.json()) as TFetchResponse<{
            requirementId: string
        }>

        return data
    }

    async createRequirement(
        fields: Omit<
            IRrequirementsStatsType,
            | 'id'
            | 'userId'
            | 'createdTimeStamp'
            | 'updatedTimeStamp'
            | 'deleted'
            | 'executed'
        >,
        authToken: string
    ): Promise<
        TFetchResponse<
            IUserStats & {
                requirements: Omit<
                    IRrequirementsStatsType,
                    'userId' | 'deleted'
                >[]
            }
        >
    > {
        try {
            const body: Omit<
                IRrequirementsStatsType,
                | 'id'
                | 'userId'
                | 'createdTimeStamp'
                | 'updatedTimeStamp'
                | 'deleted'
                | 'executed'
            > = {
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
            const data = (await response.json()) as TFetchResponse<
                IUserStats & {
                    requirements: Omit<
                        IRrequirementsStatsType,
                        'userId' | 'deleted'
                    >[]
                }
            >

            return data
        } catch (e) {
            return {
                payload: null,
                status: {
                    code: 343,
                    details: 'bad mood',
                },
            }
        }
    }

    constructor(factory: IRequirementFactory) {}
}
