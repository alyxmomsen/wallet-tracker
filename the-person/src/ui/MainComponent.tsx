import React, { useEffect } from 'react'
import { UseAppContext } from './ApplicationContext'
import Person from './Person'

const MainComponent = () => {
    const { service } = UseAppContext()

    useEffect(() => {}, [service])

    return (
        <div>
            <h2>Main Component</h2>
            <div>
                {service.getPersons().map((person) => (
                    <Person person={person} />
                ))}
            </div>
        </div>
    )
}

export default MainComponent
