import React from 'react'
import { UseAppContext } from '../../context/UseAppContext'
import AddRequirementForm from '../../add-req-form/AddRequirementFormWindow'

const AddRequirementTabUI = () => {
    const {
        user: currentPerson,
        setUser: setCurrentPerson,
        setCurentWindow: setCurPage,
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
