import {
    TFetchAuthResponseData,
    TFetchResponse,
} from '../../ui-v2/login-window/RegistrationUI'
import { ServerBaseURL } from '../../ui-v2/user-card/PersonCardUI'
import { ICreateUserResponseData } from '../App-facade'

export interface ICreateUserService {
    execute(
        userName: string,
        password: string
    ): Promise<ICreateUserResponseData>
}

export class CreateUserService implements ICreateUserService {
    async execute(
        userName: string,
        password: string
    ): Promise<ICreateUserResponseData> {
        if (typeof userName === 'string' && typeof password === 'string') {
            if (userName.length < 3 && password.length < 6) {
                return Promise.resolve({
                    status: {
                        code: 1,
                        details: 'incorrect password or user name',
                    },
                    payload: null,
                })
            }

            try {
                const response = await fetch(ServerBaseURL + '/registration', {
                    method: 'post',
                    body: JSON.stringify({
                        userName,
                        password,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                const data =
                    (await response.json()) as TFetchResponse<TFetchAuthResponseData>

                const payload = data.payload

                if (data.status.code > 0) {
                    return Promise.resolve({
                        payload: null,
                        status: {
                            code: 4,
                            details: data.status.details,
                        },
                    })
                }

                return Promise.resolve({
                    payload: payload
                        ? {
                              userId: payload.userId,
                          }
                        : null,
                    status: {
                        code: 0,
                        details: 'user created successfully',
                    },
                })
            } catch (e) {
                return Promise.resolve({
                    payload: null,
                    status: {
                        code: 3,
                        details: 'fetch irror',
                    },
                })
            }
        } else {
            return Promise.resolve({
                status: {
                    code: 2,
                    details: 'incorrect data type',
                },
                payload: null,
            })
        }
    }

    constructor() {}
}
