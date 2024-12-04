import React from 'react'
import { UseAppContext } from '../context/UseAppContext'
import { IPerson } from '../../core/Person'
import DirectionOptionUI from './options/DirectionOptionUI'
import ValueOptionUI from './options/ValueOptionUI'
import TitleOptionUI from './options/TitleOptionUI'
import DateOptionUI from './options/DateOptionUI'
import AddOtherOption from './options/AddOtherOption'
import AddDateFormContextProvider from '../context/AddRequirementContextProvider'
import ApplyButtonUI from './options/ApplyButtonUI'
import DescriptionOptionUI from './options/DescriptionOption'

const AddRequirementForm = ({ person }: { person: IPerson }) => {
    const {} = UseAppContext()

    return (
        <AddDateFormContextProvider>
            <div>
                <h2>Add Requirement Form</h2>
                <div className="flex-box flex-dir-col pdg bdr">
                    <DirectionOptionUI />
                    <ValueOptionUI />
                    <TitleOptionUI />
                    <DateOptionUI />
                    <AddOtherOption />
                    <ApplyButtonUI />
                    <DescriptionOptionUI />
                </div>
            </div>
        </AddDateFormContextProvider>
    )
}

export default AddRequirementForm
