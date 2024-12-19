import React, { useState } from 'react'
import { UseAppContext } from '../context/UseAppContext'
import { OrdinaryPerson } from '../../core/person/Person'
import { TFetchAuthResponseData, TFetchResponse } from './RegistrationUI'
import { requestUserData } from '../context/AppContextProvider'
import PersonCardUI, { ServerBaseURL } from '../PersonCardUI'
import { AuthUserService } from '../../core/services/auth-service'

const AuthorizationUI = () => {
    const { setCurentWindow, app } = UseAppContext()

    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [inProcess, setInProcess] = useState(false)
    const [responseMessage, setResponseMessage] = useState('')

    return (
        <div className="flex-box flex-dir-col bdr pdg-x3 flex-item">
            <h2>Authorization</h2>{' '}
            {responseMessage.length ? (
                <div
                    className="pdg"
                    style={{ backgroundColor: 'orange', color: 'whitesmoke' }}
                >
                    {responseMessage}
                </div>
            ) : (
                <div></div>
            )}
            <div className="flex-box flex-jtf-btw">
                <span>user name</span>
                <input
                    onChange={(e) => {
                        const value = e.currentTarget.value
                        setUsername(value)
                    }}
                    placeholder={'tape you first name'}
                    type="text"
                    value={userName}
                />
            </div>
            <div className="flex-box flex-jtf-btw">
                <span>password</span>
                <input
                    onChange={(e) => {
                        const value = e.currentTarget.value
                        setPassword(value)
                    }}
                    placeholder={'tape you second name'}
                    type="password"
                    value={password}
                />
            </div>
            <div>
                <button
                    onClick={async (e) => {
                        setInProcess(true)
                        setResponseMessage('in process...')
                        const person = await app.authUserAsync(
                            userName,
                            password,
                            new AuthUserService()
                        )

                        if (person) {
                            // app.setUserLocally(person);

                            setInProcess(false)
                        }

                        setResponseMessage('bla bla')
                    }}
                    className="btn"
                >
                    auth
                </button>
            </div>
        </div>
    )
}

// 

export default AuthorizationUI

type TFetchRequestInit = {
    method: 'post'
    body: string
    headers: {
        'Content-Type': 'Application/JSON'
    }
}

type TFetchRequestBody = {
    username: string
    password: string
}

export async function requestAuthorization(username: string, password: string) {
    const response = await fetch(ServerBaseURL + '/auth', {
        method: 'post',
        body: JSON.stringify({
            username,
            password,
        } as TFetchRequestBody),
        headers: {
            'Content-Type': 'Application/JSON',
        },
    } as TFetchRequestInit)

    const data =
        (await response.json()) as TFetchResponse<TFetchAuthResponseData>

    return data
}
