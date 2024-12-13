import React, { useEffect, useState } from 'react'
import { UseAppContext } from '../context/UseAppContext'
import { UseFetch } from '../../utils/UseFetch'

const RegistrationUI = () => {
    const [password, setPassword] = useState<string>('')
    const [username, setUserName] = useState<string>('')

    const [isRequestStarted, setIsRequestStarted] = useState<boolean>(false)
    const [responsedStatusDetails, setResponsedStatusDetails] = useState<
        string | undefined
    >(undefined)
    const [statusCode, setStatusCode] = useState<number | undefined>(undefined)
    const [isRequestDone, setIsRequestDone] = useState(false)
    // const [] = useState();
    // const [] = useState();

    const { app, loginedPerson, update } = UseAppContext()

    // const [ifSend , setIfSend] = useState(false);

    useEffect(() => {}, [])
    // useEffect(() => {} , []);
    // useEffect(() => {} , []);
    // useEffect(() => {} , []);

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
                        value={username}
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
                        // setIfSend(true);
                        setIsRequestStarted(true)
                        setIsRequestDone(false)
                        registrationRequest(username, password)
                            .then((response) => {
                                setIsRequestDone(true)
                                console.log({ response })
                                setResponsedStatusDetails(
                                    response.status.details
                                )
                                setStatusCode(response.status.code)
                            })
                            .catch(() => {
                                alert()
                            })
                            .finally()
                    }}
                >
                    registration
                </button>
            </div>
            <div>
                {isRequestStarted ? (
                    <div style={{ color: statusCode ? 'orange' : 'green' }}>
                        {isRequestDone ? responsedStatusDetails : 'requesting'}
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    )
}

export default RegistrationUI

export type TFetchUserData = {
    userName: string
    // requirements
}

// export type TFetchUserRequirements

export type TFetchUserRequirementStats = {
    title: string
    value: number
    description: string
    date: number
    isExecuted: boolean
    transactionTypeCode: number
}

export type TFetchAuthorizationUserData = {
    userId: number
}

export type TFetchRegistrationResponse<T> = {
    status: {
        code: number
        details: string
    }
    payload: T | null
}

export type TFetchResponse<T> = {
    status: {
        code: number
        details: string
    }
    payload: T
}

async function registrationRequest(
    username: string,
    password: string
): Promise<TFetchRegistrationResponse<TFetchAuthorizationUserData>> {
    console.log({ username, password })

    console.log(JSON.stringify({ username, password }))

    const response = await fetch('http://localhost:3030/registration', {
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

    fetch(`http://localhost:3030/${endPoint}`, {
        method: 'post',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    })
        .then(
            (response) =>
                response.json() as Promise<TFetchRegistrationResponse<null>>
        )
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
