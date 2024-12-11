import React, { useState } from 'react'
import { UseAppContext } from '../context/UseAppContext'

const AuthorizationUI = () => {
    const { app } = UseAppContext()

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
                        const response = await AuthRequest(username, password)
                            .catch((e) => {
                                console.log({ e })
                            })
                            .finally()

                        const { username: name, userId: token } = response

                        window.localStorage.setItem('userId', token)

                        console.log('holly molly', token, response)

                        if (token) {
                            console.log('test')

                            fetch('http://localhost:3030/get-user', {
                                method: 'post',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'x-auth': token,
                                },
                            })
                                .then((res) => res.json())
                                .then((json) => {
                                    if ((json.status = true)) {
                                        const username = json.payload.username
                                        app.addPerson(username, 0, '')
                                        app.setUser()
                                    }

                                    console.log({ json })
                                })
                                .catch((e) => {
                                    console.log('something wrong', e)
                                })
                                .finally(() => {})
                        }
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

async function AuthRequest(username: string, password: string) {
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
