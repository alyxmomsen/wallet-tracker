import React from 'react'
import { UseAppCtx } from './AppCtxProvider'

const SomeComponent = () => {
    const { modals, setModals: modalsDispatch, update } = UseAppCtx()

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
