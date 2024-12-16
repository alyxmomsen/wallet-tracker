import {
    TFetchResponse,
    TFetchUserData,
} from '../../ui-v2/login-window/RegistrationUI'
import { ServerBaseURL } from '../../ui-v2/PersonCardUI'

export interface IGetUserService {
    byId(id: string): Promise<TFetchResponse<TFetchUserData>>
}

export class GetUserService implements IGetUserService {
    async byId(id: string): Promise<TFetchResponse<TFetchUserData>> {
        const response = await fetch(ServerBaseURL + '/get-user-protected', {
            headers: {
                'content-type': 'application/json',
                'x-auth': id,
            },
            method: 'post',
        })

        const data = await response.json() as TFetchResponse<TFetchUserData>

        const { payload, status } = data;
        
        return data;
    }
}
