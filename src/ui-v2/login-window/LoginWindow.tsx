import React, { useMemo, useState } from 'react'
import { UseAppContext } from '../context/UseAppContext'
import RegistrationUI from './RegistrationUI'
import AuthorizationUI from './AuthorizationUI'

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

const LoginWindow = () => {
    const { loginedPerson, setLoginedPerson, setCurPage, app } = UseAppContext()

    const [index, setIndex] = useState<number | undefined>(
        arr.length ? 0 : undefined
    )

    const [HOCs, setHOCs] = useMemo(
        () =>
            useState<(() => JSX.Element)[]>([
                () => <RegistrationUI />,
                loginedPerson
                    ? () => <button>logout</button>
                    : () => <AuthorizationUI />,
            ]),
        [loginedPerson]
    )

    return (
        <div>
            <h2>loggin window</h2>
            <div>{HOCs.map((hoc) => hoc())}</div>
            <div>
                {[
                    ...app
                        .getPersons()
                        .filter((person) => {
                            return !loginedPerson
                                ? true
                                : loginedPerson === person
                        })
                        .map((person) => {
                            return (
                                <button
                                    className="btn main-menu__button"
                                    onClick={() => {
                                        setLoginedPerson(person)
                                    }}
                                >
                                    {person.getName()}
                                </button>
                            )
                        }),
                ]}
            </div>
        </div>
    )
}

export default LoginWindow
