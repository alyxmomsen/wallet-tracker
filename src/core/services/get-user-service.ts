import {
    TFetchResponse,
    TFetchUserData,
} from '../../ui-v2/login-window/RegistrationUI'
import { ServerBaseURL } from '../../ui-v2/user-card/PersonCardUI'
import { IUserStats } from '../types/common'

export interface IGetUserService {
    byId(id: string): Promise<TFetchResponse<Omit<IUserStats, 'id'>>>
}

export class GetUserService implements IGetUserService {
    async byId(id: string): Promise<TFetchResponse<Omit<IUserStats, 'id'>>> {
        const response = await fetch(ServerBaseURL + '/get-user-protected', {
            headers: {
                'content-type': 'application/json',
                'x-auth': id,
            },
            method: 'post',
        })

        const data = (await response.json()) as TFetchResponse<
            Omit<IUserStats, 'id'>
        >

        // const { payload, status } = data

        return data
    }
}
