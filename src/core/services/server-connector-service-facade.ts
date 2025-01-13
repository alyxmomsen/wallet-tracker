import { TFetchResponse } from '../../ui-v2/login-window/RegistrationUI'
import { ServerBaseURL } from '../../ui-v2/user-card/PersonCardUI'
import {
    IRequirementStats,
    IRrequirementsStatsType,
} from '../requirement-command/interfaces'
import { IUserStats } from '../types/common'
import { AuthUserService, IAuthService } from './auth-service'
import { GetUserService, IGetUserService } from './get-user-service'

export interface IHTTPServerCommunicateService {
    getUserById(id: string): Promise<TFetchResponse<Omit<IUserStats, 'id'>>>
    getUserByAuthToken(token: string): Promise<
        TFetchResponse<{
            userStats: Omit<IUserStats, 'id'> & {
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
            userStats: Omit<IUserStats, 'id'> & {
                requirements: Omit<
                    IRrequirementsStatsType,
                    'userId' | 'deleted'
                >[]
            }
            authToken: string
        }>
    >
    pushUserDataStats(
        user: Omit<IUserStats, 'id' | 'requirements' | 'password'> & {
            requirements: Omit<IRrequirementsStatsType, 'userId' | 'deleted'>[]
        },
        authToken:string,
    ): Promise<
        TFetchResponse<
            Omit<IUserStats, 'id' | 'requirements' | 'password'> & {
                requirements: Omit<
                    IRrequirementsStatsType,
                    'userId' | 'deleted'
                >[]
            }
        >
    >
}

export interface IFetchHeaders {
    'content-type': string
    'x-auth': string
}

export class HTTPServerComunicateService
    implements IHTTPServerCommunicateService
{
    async pushUserDataStats(
        user: Omit<IUserStats, 'id' | 'requirements' | 'password'> & {
            requirements: Omit<IRrequirementsStatsType, 'userId' | 'deleted'>[]
        },
        authToken:string ,
    ): Promise<
        TFetchResponse<
            Omit<IUserStats, 'id' | 'requirements' | 'password'> & {
                requirements: Omit<
                    IRrequirementsStatsType,
                    'userId' | 'deleted'
                >[]
            }
        >
    > {
        const authJWTToken = authToken;
            // localStorageService.getAuthData()

        if (authJWTToken === null)
            return {
                payload: null,
                status: {
                    code: 0,
                    details: 'no auth token (in local storage)',
                },
            }

        const response = await fetch(ServerBaseURL + '/update-user', {
            headers: {
                'content-type': 'application/json',
                'x-auth': authJWTToken,
            },
            body: JSON.stringify(user),
            method: 'post',
        })

        const data = (await response.json()) as TFetchResponse<
            Omit<IUserStats, 'id' | 'requirements' | 'password'> & {
                requirements: Omit<IRrequirementsStatsType, 'userId'>[]
            }
        >

        console.log('>>> update user request ::  server respose: ', { data })

        return data
    }

    async getUserByUserNameAndPassword(
        userName: string,
        password: string
    ): Promise<
        TFetchResponse<{
            userStats: Omit<IUserStats, 'id'> & {
                requirements: Omit<
                    IRrequirementsStatsType,
                    'userId' | 'deleted'
                >[]
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
            userStats: Omit<IUserStats, 'id'> & {
                requirements: Omit<
                    IRrequirementsStatsType,
                    'userId' | 'deleted'
                >[]
            }
            authToken: string
        }>

        return responseData
    }
    async getUserByAuthToken(token: string): Promise<
        TFetchResponse<{
            userStats: Omit<IUserStats, 'id'> & {
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
            userStats: Omit<IUserStats, 'id'> & {
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
    ): Promise<TFetchResponse<Omit<IUserStats, 'id'>>> {
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
