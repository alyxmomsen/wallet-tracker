import React from 'react'
import { UseAppContext } from '../context/UseAppContext'

const LoginWindow = () => {
    const { currentPerson, setCurrentPerson, setCurPage, app } = UseAppContext()
    return (
        <div>
            <h2>loggin window</h2>
            <div>
                {[
                    ...app
                        .getPersons()
                        .filter((person) => {
                            return !currentPerson
                                ? true
                                : currentPerson === person
                        })
                        .map((person) => {
                            return (
                                <button
                                    className="btn main-menu__button"
                                    onClick={() => {
                                        setCurrentPerson(person)
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
