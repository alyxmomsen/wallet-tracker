import React from 'react'
import { UseAppContext } from '../../context/UseAppContext'
import LoginWindow from '../../login-window/LoginWindow'

const LoginButtonTabUI = () => {
    const {
        loginedPerson: currentPerson,
        setLoginedPerson: setCurrentPerson,
        setCurPage,
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
                setCurPage(<LoginWindow />)
            }}
            disabled={false}
            className={`main-menu__button btn`}
        >
            {currentPerson ? 'LogOut' : 'LogIn'}
        </button>
    )
}

export default LoginButtonTabUI
