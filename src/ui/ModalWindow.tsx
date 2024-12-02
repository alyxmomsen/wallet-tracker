import React from 'react'
import { AddRequirementContextPorvider } from './add-requirements-form/AddRequirementContext'

const ModalWindow = ({ component }: { component: JSX.Element }) => {
    return (
        <div className="modal">
            <AddRequirementContextPorvider>
                <>
                    <div>{component}</div>
                </>
            </AddRequirementContextPorvider>
        </div>
    )
}

export default ModalWindow
