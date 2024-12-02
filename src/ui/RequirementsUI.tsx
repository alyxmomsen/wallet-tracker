import React from 'react'
import { IPerson } from '../core/Person'
import RequirementPreviewUI from './RequirementPrevUI'
import { UseDateContext } from './add-requirements-form/AddRequirementContext'
import { UseAppContext } from './ApplicationContext'

const RequirementsUI = ({ person }: { person: IPerson }) => {
    const act = person.getActualRequirements()
    const exec = person.getExecutedRequirements()

    const { modals, setModals } = UseAppContext()

    return (
        <div className="modal">
            <header>
                <div>{person.getName()}</div>
                <button
                    onClick={() => {
                        setModals([
                            ...modals.filter((elem) => elem !== modals.pop()),
                        ])
                    }}
                >
                    close
                </button>
            </header>
            <div>
                <div>
                    {act.length ? (
                        <div>
                            <h3>Actual:</h3>
                            {act.map((requirement) => (
                                <RequirementPreviewUI
                                    person={person}
                                    requirement={requirement}
                                />
                            ))}
                        </div>
                    ) : null}
                    {exec.length ? (
                        <div>
                            <h3>Executed:{exec.length}</h3>
                        </div>
                    ) : null}
                </div>
            </div>
            <footer></footer>
        </div>
    )
}

export default RequirementsUI
