import { TFetchResponse } from '../../ui-v2/login-window/RegistrationUI'
import { IUserData } from '../types/common'
import { AuthUserService, IAuthService } from './auth-service'
import { GetUserService, IGetUserService } from './get-user-service'

export interface IServerConnector {
    getUserById(id: string): Promise<TFetchResponse<Omit<IUserData, 'id'>>>
}

export class ServerConnector implements IServerConnector {
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
