import React from 'react'
import { UseAppContext } from './ApplicationContext'
import ModalWindow from './ModalWindow'
import { Page } from './Page'

const AppMainComponent = () => {
    const { modals, currentPage, setCurrentPage } = UseAppContext()

    return (
        <div>
            <h2>Main Component</h2>
            <div className="bdr">
                <button
                    onClick={() => {
                        setCurrentPage(<div>hellooooo woooorlldd</div>)
                        return 0
                    }}
                    className="btn"
                >
                    btn
                </button>
                <button
                    onClick={() => {
                        return 0
                    }}
                    className="btn"
                >
                    btn
                </button>
                <button
                    onClick={() => {
                        return 0
                    }}
                    className="btn"
                >
                    btn
                </button>
                <button
                    onClick={() => {
                        return 0
                    }}
                    className="btn"
                >
                    btn
                </button>
            </div>
            <div>{currentPage.getElement()}</div>
            {modals.length ? (
                <ModalWindow component={modals[modals.length - 1]} />
            ) : null}
        </div>
    )
}

export default AppMainComponent
