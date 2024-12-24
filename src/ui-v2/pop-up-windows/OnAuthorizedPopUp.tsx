import React from 'react'
import { UseAppContext } from '../context/UseAppContext'
import PersonCardUI from '../user-card/PersonCardUI'

const OnAuthorizedPopUp = ({
    timeOutId,
}: {
    timeOutId: NodeJS.Timeout | null
}) => {
    const { app, setCurentWindow, setPopUpWindow: setPopUp } = UseAppContext()

    return (
        <div className="modal--notyf pdg flex-box flex-dir-col">
            <div className="modal--notyf__elem flex-box flex-dir-col">
                <div>you authorized</div>
                <div>Do you want to go to the user's page?</div>
                <div className="flex-box">
                    <div>
                        <button
                            onClick={() => {
                                const user = app.getLocalUserStats()
                                if (!user) return
                                setCurentWindow(<PersonCardUI person={user} />)
                                if (timeOutId) clearTimeout(timeOutId)
                                setPopUp(null)
                            }}
                            className="btn"
                        >
                            my profile
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                if (timeOutId) clearTimeout(timeOutId)
                                setPopUp(null)
                            }}
                            className="btn"
                        >
                            X
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OnAuthorizedPopUp
