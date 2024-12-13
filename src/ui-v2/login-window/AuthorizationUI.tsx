import React, { useState } from 'react'
import { UseAppContext } from '../context/UseAppContext'
import { OrdinaryPerson } from '../../core/person/Person'

const AuthorizationUI = () => {
    const { app, setLoginedPerson, update } = UseAppContext()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // app.setUser()

    return (
        <div className="flex-box flex-dir-col bdr pdg-x3 flex-item">
            <h2>Authorization</h2>
            <div className="flex-box flex-jtf-btw">
                <span>user name</span>
                <input
                    onChange={(e) => {
                        const value = e.currentTarget.value
                        setUsername(value)
                    }}
                    placeholder={'tape you first name'}
                    type="text"
                    value={username}
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
                        const response = await authRequest(username, password)
                            .catch((e) => {
                                console.log({ e })
                            })
                            .finally()

                        const { username: name, userId: token } = response

                        window.localStorage.setItem('userId', token)

                        setLoginedPerson(new OrdinaryPerson(name, 0))
                    }}
                    className="btn"
                >
                    auth
                </button>
            </div>
        </div>
    )
}

export default AuthorizationUI

export async function authRequest(username: string, password: string) {
    const response = await fetch('http://localhost:3030/auth', {
        method: 'post',
        body: JSON.stringify({
            username,
            password,
        }),
        headers: {
            'Content-Type': 'Application/JSON',
        },
    })

    const data = await response.json()

    return data
}
