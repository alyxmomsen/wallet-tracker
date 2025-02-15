import React, { useState } from 'react'
import { UseAppContext } from '../context/UseAppContext'
import Button from './shared/Button'

const AuthorizationUI = () => {
    const { app, localStorageService } = UseAppContext()

    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [messageColor, setMessageColor] = useState<string>('')
    const [inProcess, setInProcess] = useState(false)
    const [responseMessage, setResponseMessage] = useState('')

    return (
        <div className="flex-box flex-dir-col bdr pdg-x3 flex-item">
            <h2>Authorization</h2>{' '}
            {responseMessage.length ? (
                <div
                    className="pdg"
                    style={{
                        backgroundColor: messageColor,
                        color: 'whitesmoke',
                    }}
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
            <Button
                title="auth"
                onClickHandler={async () => {
                    setInProcess(true)
                    setMessageColor('grey')
                    setResponseMessage('in process...')

                    const token = await app.userLogIn(userName, password)
                    if (token === null) {
                        setMessageColor('red')
                        setResponseMessage('fail')

                        return
                    }

                    localStorageService.setAuthData(token)

                    setResponseMessage('user authorized')
                    setMessageColor('green')
                    setInProcess(false)
                }}
            />
        </div>
    )
}

export default AuthorizationUI
