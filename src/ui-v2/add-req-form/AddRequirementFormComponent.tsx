import React, { useState } from 'react'
import DirectionOptionUI from './options/DirectionOptionUI'
import ValueOptionUI from './options/ValueOptionUI'
import TitleOptionUI from './options/TitleOptionUI'
import DateOptionUI from './options/DateOptionUI'
import AddOtherOption from './options/AddOtherOption'
import ApplyButtonUI from './options/ApplyButtonUI'
import DescriptionOptionUI from './options/DescriptionOption'
import { UseDateFormContext } from '../context/AddRequirementContextProvider'
import { UseAppContext } from '../context/UseAppContext'
import GoPersonButton from '../shared/GoPersonButtonUI'
import TrackComponentUI from '../track-component-ui/TrackComponentUI'
import { IRequirementCommand } from '../../core/requirement-command/RequirementCommand'

const AddRequirementFormComponent = () => {
    const {
        isRequirementAddedSuccessfully,
        setIsRequirementAddedSuccessfully,
        isNewRequirementBeingWritten,
        setIsNewRequirementBeingWritten,
        optionalFields,
    } = UseDateFormContext()

    const { setCurentWindow, loginedPerson } = UseAppContext()

    return (
        <div className="element-type--1 flex-box flex-dir-col gap">
            <div className="flex-box">
                <GoPersonButton />
                <div>
                    <button
                        onClick={() => {
                            if (loginedPerson) {
                                setCurentWindow(
                                    <TrackComponentUI person={loginedPerson} />
                                )
                            }
                        }}
                        className="btn"
                    >
                        Go Track
                    </button>
                </div>
            </div>
            <h2>Add Requirement Form</h2>
            {isNewRequirementBeingWritten ? (
                <div className="flex-box flex-dir-col pdg bdr flex-item">
                    <DirectionOptionUI />
                    <ValueOptionUI />
                    <TitleOptionUI />
                    <DateOptionUI />
                    <AddOtherOption />
                    <ApplyButtonUI />
                    {optionalFields.map((elem) => {
                        return elem.execute()
                    })}
                </div>
            ) : isRequirementAddedSuccessfully ? (
                <ThankYouMessageUI />
            ) : (
                <div>case2</div>
            )}
        </div>
        // {}
    )
}

export default AddRequirementFormComponent

const ThankYouMessageUI = () => {
    const { setIsNewRequirementBeingWritten } = UseDateFormContext()
    const { loginedPerson, setCurentWindow } = UseAppContext()

    const [logPersActReqCommands, setThat] = useState<IRequirementCommand[]>(
        loginedPerson ? loginedPerson.getActualRequirementCommands() : []
    )

    return (
        <div className="flex-box flex-center">
            <h3>thank you for you added you requrierement</h3>

            <div className="flex-box">
                <div>
                    <GoPersonButton />
                </div>
                <div>
                    <button
                        onClick={() => {
                            setIsNewRequirementBeingWritten(true)
                        }}
                        className="btn"
                    >
                        Add another one
                    </button>
                </div>
                {logPersActReqCommands ? (
                    <div>
                        <button
                            className="btn"
                            onClick={() =>
                                loginedPerson
                                    ? setCurentWindow(
                                          <TrackComponentUI
                                              person={loginedPerson}
                                          />
                                      )
                                    : null
                            }
                        >
                            GO TRack
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
    )
}
