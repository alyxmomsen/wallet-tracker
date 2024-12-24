import React from 'react'
import { UseAppContext } from '../../context/UseAppContext'
import AddRequirementForm from '../../add-req-form/AddRequirementFormWindow'

const AddRequirementTabUI = () => {
    const {
        loginedPerson: currentPerson,
        setUser: setCurrentPerson,
        setCurentWindow: setCurPage,
    } = UseAppContext()
    return (
        <button
            onClick={() => {
                if (currentPerson) {
                    setCurPage(<AddRequirementForm />)
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
