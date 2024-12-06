import React from 'react'
import DirectionOptionUI from './options/DirectionOptionUI'
import ValueOptionUI from './options/ValueOptionUI'
import TitleOptionUI from './options/TitleOptionUI'
import DateOptionUI from './options/DateOptionUI'
import AddOtherOption from './options/AddOtherOption'
import ApplyButtonUI from './options/ApplyButtonUI'
import DescriptionOptionUI from './options/DescriptionOption'
import { UseDateFormContext } from '../context/AddRequirementContextProvider'

const AddRequirementFormComponent = () => {
    const {
        isRequirementAddedSuccessfully,
        setIsRequirementAddedSuccessfully,
        isNewRequirementBeingWritten,
        setIsNewRequirementBeingWritten,
    } = UseDateFormContext()

    return (
        <div className="element-type--1 flex-box flex-dir-col gap">
            <h2>Add Requirement Form</h2>
            {isNewRequirementBeingWritten ? (
                <div className="flex-box flex-dir-col pdg bdr flex-item">
                    <DirectionOptionUI />
                    <ValueOptionUI />
                    <TitleOptionUI />
                    <DateOptionUI />
                    <AddOtherOption />
                    <ApplyButtonUI />
                    <DescriptionOptionUI />
                </div>
            ) : isRequirementAddedSuccessfully ? (
                <div>
                    <h3>thank you for you added you requrierement</h3>

                    <div>
                        <button
                            onClick={() => {
                                setIsNewRequirementBeingWritten(true)
                            }}
                            className="btn"
                        >
                            Add another one
                        </button>
                        {/* <button></button> */}
                    </div>
                </div>
            ) : (
                <div>case2</div>
            )}
        </div>
        // {}
    )
}

export default AddRequirementFormComponent