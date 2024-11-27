import React from 'react'
import { IPerson } from '../core/Person'
import { UseAppContext } from './ApplicationContext'

const PersonCardUI = ({ person }: { person: IPerson }) => {
    const { modals, setModals } = UseAppContext()

    const act = person.getActualRequirements()
    const exec = person.getExecutedRequirements()

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
                        {act.map((elem) => (
                            <div>{elem.getTitle()}</div>
                        ))}
                        {exec.map((elem) => (
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
