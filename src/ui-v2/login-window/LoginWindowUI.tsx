import React, { useMemo, useState } from 'react'
import { UseAppContext } from '../context/UseAppContext'

import PersonCardUI from '../PersonCardUI'
import { PersonFactory } from '../../core/person/factories/PersonFactory'
import AuthorizationUI from './AuthorizationUI'
import RegistrationUI from './RegistrationUI'

class NavigationElementFactory {
    protected links: NavigationElementFactory[]

    addLink(link: NavigationElementFactory) {
        this.links.push(link)
    }

    getLinks() {
        return this.links
    }

    Instance() {}

    constructor() {
        this.links = []
    }
}

// const arr = [() => <RegistrationUI />, () => <RegistrationUI />]

const LoginWindowUI = () => {
    const [state, setState] = useState(false)

    const {
        loginedPerson,
        setUser: setLoginedPerson,
        setCurentWindow: setCurPage,
        app,
    } = UseAppContext()

    return (
        <div>
            <h2>loggin window</h2>

            <div className="pdg flex-box">
                <div>
                    <button
                        onClick={() => {
                            setState((state) => !state)
                        }}
                        className="btn"
                    >
                        {'Go to ' + (state ? 'registration' : 'authorization')}
                    </button>
                </div>
                {app.getLocalUser() && (
                    <div>
                        <button
                            style={{ backgroundColor: 'orange' }}
                            className="btn"
                            onClick={() => {
                                const user = app.getLocalUser()

                                if (user) {
                                    setCurPage(<PersonCardUI person={user} />)
                                }
                            }}
                        >
                            go to user card
                        </button>
                    </div>
                )}
            </div>
            {state ? <AuthorizationUI /> : <RegistrationUI />}
        </div>
    )
}

export default LoginWindowUI
