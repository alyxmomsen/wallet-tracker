import { TFetchResponse } from '../../ui-v2/login-window/RegistrationUI'
import { ServerBaseURL } from '../../ui-v2/user-card/PersonCardUI'
import { IRequirementStats } from '../requirement-command/interfaces'
import { IUserData } from '../types/common'
import { AuthUserService, IAuthService } from './auth-service'
import { GetUserService, IGetUserService } from './get-user-service'

export interface IServerConnector {
    getUserById(id: string): Promise<TFetchResponse<Omit<IUserData, 'id'>>>
    getUserByAuthToken(token: string): Promise<
        TFetchResponse<{
            userStats: Omit<IUserData, 'id'> & {
                requirements: Omit<IRequirementStats, 'userId'>[]
            }
            authToken: string
        }>
    >
    getUserByUserNameAndPassword(
        userName: string,
        password: string
    ): Promise<
        TFetchResponse<{
            userStats: Omit<IUserData, 'id'> & {
                requirements: Omit<IRequirementStats, 'userId'>[]
            }
            authToken: string
        }>
    >
}

export interface IFetchHeaders {
    'content-type': string
    'x-auth': string
}

export class ServerConnector implements IServerConnector {
    async getUserByUserNameAndPassword(
        userName: string,
        password: string
    ): Promise<
        TFetchResponse<{
            userStats: Omit<IUserData, 'id'> & {
                requirements: Omit<IRequirementStats, 'userId'>[]
            }
            authToken: string
        }>
    > {
        const headers = {
            'content-type': 'application/json',
        }

        const bodyInitData: { userName: string; password: string } = {
            userName,
            password,
        }

        const response = await fetch(
            ServerBaseURL + '/get-user-with-username-and-password',
            {
                headers: headers,
                method: 'post',
                body: JSON.stringify(bodyInitData),
            }
        )

        const responseData = (await response.json()) as TFetchResponse<{
            userStats: Omit<IUserData, 'id'> & {
                requirements: Omit<IRequirementStats, 'userId'>[]
            }
            authToken: string
        }>

        return responseData
    }
    async getUserByAuthToken(token: string): Promise<
        TFetchResponse<{
            userStats: Omit<IUserData, 'id'> & {
                requirements: Omit<IRequirementStats, 'userId'>[]
            }
            authToken: string
        }>
    > {
        const headers = {
            'content-type': 'application/json',
            'x-auth': token,
        }

        const response = await fetch(ServerBaseURL + '/get-user-with-token', {
            headers: headers,
            method: 'post',
        })

        const responseData = (await response.json()) as TFetchResponse<{
            userStats: Omit<IUserData, 'id'> & {
                requirements: Omit<IRequirementStats, 'userId'>[]
            }
            authToken: string
        }>

        /* ----- */

        // some actions , if you need

        /* ----- */

        return responseData
    }

    async getUserById(
        id: string
    ): Promise<TFetchResponse<Omit<IUserData, 'id'>>> {
        const response = await this.getUserService.byId(id)
        return response
    }
    private getUserService: IGetUserService
    private authUserService: IAuthService

    constructor() {
        this.getUserService = new GetUserService()
        this.authUserService = new AuthUserService()
    }
}
