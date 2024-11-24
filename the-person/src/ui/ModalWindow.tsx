import React from 'react'

const ModalWindow = ({ component }: { component: JSX.Element }) => {
    return (
        <div className="modal">
            <h2>Modal Window</h2>

            <div>{component}</div>
        </div>
    )
}

export default ModalWindow
