import React, { useEffect, useState } from 'react'
import { UseAppContext } from './ApplicationContext'
import Person from './Person'
import ModalWindow from './ModalWindow'
import AddRequirementForm from './AddRequirementForm'
import { OrdinaryPerson } from '../core/Person'
import { Requirement } from '../core/Requirement'
import { DecrementMoneyRequirementCommand } from '../core/RequirementCommand'

const AppMainComponent = () => {
    const { service, modals, modalsDispatch, currentPerson, update } =
        UseAppContext()

    useEffect(() => {
        console.log({ service })
    }, [])

    return (
        <div>
            <h2>Main Component</h2>
            <div>
                {service.getPersons().map((person) => (
                    <Person person={person} />
                ))}
            </div>
            {modals.length ? (
                <ModalWindow component={modals[modals.length - 1]} />
            ) : null}
        </div>
    )
}

export default AppMainComponent
