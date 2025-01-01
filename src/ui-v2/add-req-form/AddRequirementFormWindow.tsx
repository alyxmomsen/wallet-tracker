import React, { useState } from 'react'
import AddDateFormContextProvider from '../context/AddRequirementContextProvider'
import AddRequirementFormComponent from './AddRequirementFormComponent'

const AddRequirementForm = () => {
    return (
        <AddDateFormContextProvider>
            <AddRequirementFormComponent />
        </AddDateFormContextProvider>
    )
}

export default AddRequirementForm
