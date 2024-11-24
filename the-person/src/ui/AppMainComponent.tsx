import React, { useEffect, useState } from 'react'
import { UseAppContext } from './ApplicationContext'
import PersonPreviewUI from './PersonPreviewUI'
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
            <div className="flex-box">
                {service.getPersons().map((person) => (
                    <PersonPreviewUI person={person} />
                ))}
            </div>
            {modals.length ? (
                <ModalWindow component={modals[modals.length - 1]} />
            ) : null}
        </div>
    )
}

export default AppMainComponent
