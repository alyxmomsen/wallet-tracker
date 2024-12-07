import React, { useMemo, useState } from 'react'
import { UseAppContext } from '../context/UseAppContext'
import RegistrationUI from './RegistrationUI'
import AuthorizationUI from './AuthorizationUI'
import PersonCardUI from '../PersonCardUI'

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

const arr = [() => <AuthorizationUI />, () => <RegistrationUI />]

const LoginWindowUI = () => {
    const {
        loginedPerson,
        setLoginedPerson,
        setCurentWindow: setCurPage,
        app,
    } = UseAppContext()

    const [index, setIndex] = useState<number | undefined>(
        arr.length ? 0 : undefined
    )

    const HOCs = useMemo(() => {
        return [
            () => <RegistrationUI />,
            loginedPerson
                ? () => <button>logout</button>
                : () => <AuthorizationUI />,
        ]
    }, [loginedPerson])

    return (
        <div>
            <h2>loggin window</h2>
            <div>{HOCs.map((hoc) => hoc())}</div>
            <button
                onClick={() => {
                    if (loginedPerson) {
                        setCurPage(<PersonCardUI person={loginedPerson} />)
                    }
                }}
            >
                JOIN
            </button>
        </div>
    )
}

export default LoginWindowUI
