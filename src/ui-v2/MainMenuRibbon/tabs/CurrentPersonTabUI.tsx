import React from 'react'
import { UseAppContext } from '../../context/UseAppContext'
import PersonCardUI from '../../user-card/PersonCardUI'

const CurrentPersonTabUI = () => {
    const { loginedPerson: currentPerson, setCurentWindow: setCurPage } =
        UseAppContext()

    return (
        <button
            onClick={() => {
                if (currentPerson) {
                    setCurPage(<PersonCardUI person={currentPerson} />)
                    // setIsLogined(false)
                }
            }}
            disabled={currentPerson ? false : true}
            className={`main-menu__button btn`}
        >
            {currentPerson ? currentPerson.getName() : 'Person'}
        </button>
    )
}

export default CurrentPersonTabUI
