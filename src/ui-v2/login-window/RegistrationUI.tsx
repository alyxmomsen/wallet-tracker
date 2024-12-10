import React, { useState } from 'react'
import { UseAppContext } from '../context/UseAppContext'

const RegistrationUI = () => {
    const [password, setPassword] = useState<string>('')
    const [username, setUserName] = useState<string>('')

    const { app, loginedPerson, update } = UseAppContext()

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
                    onClick={() => {
                        registrationRequest(username, password)
                            .then((response) => {
                                console.log({ response })
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
        </div>
    )
}

export default RegistrationUI

async function registrationRequest(username: string, password: string) {
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
