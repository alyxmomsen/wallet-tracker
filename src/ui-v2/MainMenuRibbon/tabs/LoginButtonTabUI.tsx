import React from 'react'
import { UseAppContext } from '../../context/UseAppContext'

const LoginButtonTabUI = () => {
    const { currentPerson, setCurrentPerson, setCurPage } = UseAppContext()
    return (
        <button
            onClick={() => {
                if (currentPerson) {
                    setCurrentPerson(null)
                    // setIsLogined(false)
                    // setIsPersonMenuRolledDown(false)
                    return
                }

                // setIsPersonMenuRolledDown((cur) => !cur)
                setCurPage(
                    <div>
                        <h1>Login page</h1>
                    </div>
                )
            }}
            disabled={false}
            className={`main-menu__button btn`}
        >
            {currentPerson ? 'LogOut' : 'LogIn'}
        </button>
    )
}

export default LoginButtonTabUI
