import {
    TFetchAuthResponseData,
    TFetchResponse,
} from '../../ui-v2/login-window/RegistrationUI'
import { ServerBaseURL } from '../../ui-v2/user-card/PersonCardUI'
import { ICheckAuthTokenResponseData } from '../App-facade'
import { IRequirementFactory } from '../requirement-command/factories/RequirementFactory'
import { IRequirementStats } from '../requirement-command/interfaces'
import { IUserData } from '../types/common'
import { IAuthService } from './auth-service'


export interface IRequirementManagementService {
    createRequirement(
        fields: Omit<IRequirementStats, 'userId' | 'id' | 'deleted'>,
        authToken: string
    ): Promise<TFetchResponse<IUserData>>

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
        fields: Omit<IRequirementStats, 'userId' | 'id'>,
        authToken: string
    ): Promise<TFetchResponse<IUserData>> {
        try {
            const body: Omit<IRequirementStats, 'userId' | 'id'> = {
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

    private requirementFactory: IRequirementFactory

    constructor(factory: IRequirementFactory) {
        this.requirementFactory = factory
    }
}
