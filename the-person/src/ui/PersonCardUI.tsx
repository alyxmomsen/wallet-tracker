import React from 'react'
import { IPerson } from '../core/Person'
import { UseAppContext } from './ApplicationContext'

const PersonCardUI = ({ person }: { person: IPerson }) => {
    const { modals, setModals } = UseAppContext()

    return (
        <div className="modal">
            <h2>PersonCardUI</h2>
            <div>
                <button
                    onClick={() => {
                        setModals(
                            modals.filter((elem) => elem !== modals.pop())
                        )
                    }}
                >
                    close button
                </button>
            </div>
            <h3>{person.getName()}</h3>
            <div>
                <div>
                    <h3>REQUIREMENTS:</h3>
                    <div>
                        {person.getActualRequirements().map((elem) => (
                            <div>{elem.getTitle()}</div>
                        ))}
                        {person.getActualRequirements().map((elem) => (
                            <div>{elem.getTitle()}</div>
                        ))}
                        <div>{}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonCardUI
