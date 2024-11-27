import React from 'react'
import { UseAppContext } from './ApplicationContext'

const SomeComponent = () => {
    const { modals, setModals: modalsDispatch, update } = UseAppContext()

    return (
        <div>
            <button
                className="btn"
                onClick={() => {
                    console.log({ modals })

                    modalsDispatch([
                        ...modals.filter((elem) => modals.pop() !== elem),
                    ])
                }}
            >
                close this one
            </button>
            SomeComponent
        </div>
    )
}

export default SomeComponent
