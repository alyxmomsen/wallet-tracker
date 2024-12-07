import React from 'react'
import { UseAppContext } from '../../context/UseAppContext'
import AddRequirementForm from '../../add-req-form/AddRequirementFormWindow'

const AddRequirementTabUI = () => {
    const {
        loginedPerson: currentPerson,
        setLoginedPerson: setCurrentPerson,
        setCurentWindow: setCurPage,
        app,
    } = UseAppContext()
    return (
        <button
            onClick={() => {
                if (currentPerson) {
                    setCurPage(<AddRequirementForm person={currentPerson} />)
                }
            }}
            disabled={currentPerson ? false : true}
            className={`main-menu__button btn`}
        >
            Add requirement
        </button>
    )
}

export default AddRequirementTabUI
