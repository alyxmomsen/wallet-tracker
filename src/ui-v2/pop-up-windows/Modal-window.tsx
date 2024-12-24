import React from 'react'
import { UseAppContext } from '../context/UseAppContext'
import PersonCardUI from '../user-card/PersonCardUI'
import { loggerCreator } from '../../core/App-facade'

const PersonIsUpdatedPopUpWindow = ({
    timeoutId,
}: {
    timeoutId: NodeJS.Timeout | null
}) => {
    const { popUpWindow, setPopUpWindow, app, setCurentWindow } =
        UseAppContext()

    return (
        <div
            onMouseLeave={() => {
                // timeOutId = setTimeout(() => setPopUp(null) , 3000);
            }}
            onMouseEnter={() => {
                if (timeoutId) {
                    clearTimeout(timeoutId)
                }
            }}
            className="modal--notyf__elem pdg  "
        >
            <div className="flex-box flex-dir-col ">
                <div>PERSON IS UPDATED</div>
                <div className="flex-box">
                    <div>
                        <button
                            onClick={() => {
                                const log = loggerCreator(
                                    true,
                                    'user-is-updateted pop-up'
                                )
                                log('button clicked')
                                log('getting user data')
                                const user = app.getUserStats()

                                if (user) {
                                    log('user-name is: ' + user.name)
                                }

                                if (user)
                                    setCurentWindow(
                                        <PersonCardUI person={user} />
                                    )
                            }}
                            className="btn"
                        >
                            Go Person
                        </button>
                    </div>
                    <div>
                        <button
                            className="btn"
                            onClick={() => {
                                console.log({
                                    timeoutId,
                                    details: 'clear',
                                })
                                if (timeoutId) {
                                    clearTimeout(timeoutId)
                                    setPopUpWindow(null)
                                }
                            }}
                        >
                            X
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonIsUpdatedPopUpWindow
