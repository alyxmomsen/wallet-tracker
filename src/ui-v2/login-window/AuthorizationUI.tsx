import React, {
    useState,
} from 'react'
import { UseAppContext } from '../context/UseAppContext'
import Button from './shared/Button'

const AuthorizationUI = () => {
    const { app } = UseAppContext()

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
                title="hello"
                onClickHandler={async () => {
                    setInProcess(true)
                    setMessageColor('grey')
                    setResponseMessage('in process...')
                    await app
                        .userLogin(userName, password)
                        .then((person) => {
                            if (!person) {
                                setMessageColor('red')
                                return setResponseMessage('fail')
                            }

                            setResponseMessage('user authorized')
                            setMessageColor('green')
                        })
                        .finally(() => {
                            setInProcess(false)
                        })
                }}
            />
        </div>
    )
}

export default AuthorizationUI
