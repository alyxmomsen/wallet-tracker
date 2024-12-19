import React, { useEffect, useState } from 'react'
import { ServerBaseURL } from '../PersonCardUI'
import { UseAppContext } from '../context/UseAppContext'
import { CreateUserService } from '../../core/services/create-user-service'

const RegistrationUI = () => {
    const { app } = UseAppContext()

    const [password, setPassword] = useState<string>('')
    const [userName, setUserName] = useState<string>('')
    const [responseMessage, setResponseMessage] = useState('')

    useEffect(() => {}, [])

    return (
        <div className="bdr pdg flex-box flex-dir-col flex-item">
            <h2>Registration</h2>
            <div className="flex-box">
                <div>username</div>
                <div>
                    <input
                        onChange={(e) => {
                            const value = e.currentTarget.value
                            setUserName(value)
                        }}
                        type="text"
                        value={userName}
                        placeholder="username"
                    />
                </div>
            </div>
            <div className="flex-box">
                <div>password:</div>
                <div>
                    <input
                        onChange={(e) => {
                            const value = e.currentTarget.value
                            setPassword(value)
                        }}
                        type="password"
                        value={password}
                        placeholder="password"
                    />
                </div>
            </div>

            <div>
                <button
                    className="btn "
                    onClick={async () => {
                        setResponseMessage('requesting...')
                        const response = await app.createUserRemote(
                            userName,
                            password,
                            new CreateUserService()
                        )

                        const { payload, status } = response
                        const responseStatusCode = status.code

                        const userId = payload ? payload.userId : undefined

                        setResponseMessage(status.details)
                    }}
                >
                    registration
                </button>
            </div>
            <div>{responseMessage}</div>
        </div>
    )
}

export default RegistrationUI

export type TFetchUserData = {
    userName: string
    wallet: number
}

// export type TFetchUserRequirements

export type TUserRequirementStats = {
    id: string
    title: string
    value: number
    description: string
    date: number
    isExecuted: boolean
    transactionTypeCode: number
}

export type TFetchAuthResponseData = {
    userId: string
}

export type TFetchResponse<T> = {
    status: {
        code: number
        details: string
    }
    payload: T | null
}

async function registrationRequest(
    username: string,
    password: string
): Promise<TFetchResponse<TFetchAuthResponseData>> {
    const response = await fetch(ServerBaseURL + '/registration', {
        method: 'post',
        body: JSON.stringify({
            username,
            password,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const jsonData = await response.json()

    return jsonData
}

function UseRegistration(username: string, password: string) {
    const [statusCode, setStatusCode] = useState<number | undefined>(undefined)
    const [isRequesting, setIsRequesting] = useState(true)
    const [endPoint, setEndponit] = useState<'registration' | 'auth'>(
        'registration'
    )

    fetch(ServerBaseURL + `/${endPoint}`, {
        method: 'post',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    })
        .then((response) => response.json() as Promise<TFetchResponse<null>>)
        .then((data) => {
            setStatusCode(data.status.code)
            setIsRequesting(false)
        })
        .catch((e) => {
            alert('E-rrrrrrooooooooaaaarrrrrr')
        })

    return {
        statusCode,
        isRequesting,
    }
}
