import React from 'react'
import { AddRequirementContextPorvider } from './AddRequirementContext'

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
