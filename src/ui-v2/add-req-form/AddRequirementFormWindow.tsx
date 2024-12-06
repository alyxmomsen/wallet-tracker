import React, { useState } from 'react'
import { UseAppContext } from '../context/UseAppContext'
import { IPerson } from '../../core/person/Person'
import DirectionOptionUI from './options/DirectionOptionUI'
import ValueOptionUI from './options/ValueOptionUI'
import TitleOptionUI from './options/TitleOptionUI'
import DateOptionUI from './options/DateOptionUI'
import AddOtherOption from './options/AddOtherOption'
import AddDateFormContextProvider from '../context/AddRequirementContextProvider'
import ApplyButtonUI from './options/ApplyButtonUI'
import DescriptionOptionUI from './options/DescriptionOption'
import AddRequirementFormComponent from './AddRequirementFormComponent'

const AddRequirementForm = ({ person }: { person: IPerson }) => {
    return (
        <AddDateFormContextProvider>
            <AddRequirementFormComponent />
        </AddDateFormContextProvider>
    )
}

export default AddRequirementForm
