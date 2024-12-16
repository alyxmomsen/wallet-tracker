import React from 'react'
import { UseAppContext } from '../../context/UseAppContext'
import LoginWindowUI from '../../login-window/LoginWindowUI'

const LoginButtonTabUI = () => {
    const {
        user: currentPerson,
        setUser: setCurrentPerson,
        setCurentWindow: setCurPage,
    } = UseAppContext()
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
                setCurPage(<LoginWindowUI />)
            }}
            disabled={false}
            className={`main-menu__button btn`}
        >
            {currentPerson ? 'LogOut' : 'LogIn'}
        </button>
    )
}

export default LoginButtonTabUI
