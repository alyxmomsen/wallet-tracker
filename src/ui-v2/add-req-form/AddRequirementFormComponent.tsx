import React, { useState } from 'react'
import DirectionOptionUI from './options/DirectionOptionUI'
import ValueOptionUI from './options/ValueOptionUI'
import TitleOptionUI from './options/TitleOptionUI'
import DateOptionUI from './options/DateOptionUI'
import AddOtherOption from './options/AddOtherOption'
import ApplyButtonUI from './options/ApplyButtonUI'
import { UseDateFormContext } from '../context/AddRequirementContextProvider'
import { UseAppContext } from '../context/UseAppContext'
import GoPersonButton from '../shared/GoPersonButtonUI'
import TrackComponentUI from '../track-component-ui/TrackComponentUI'
import { ITransactionRequirementCommand } from '../../core/requirement-command/RequirementCommand'
import { IRequirementStats } from '../../core/requirement-command/interfaces'

const AddRequirementFormComponent = () => {
    const {
        isRequirementAddedSuccessfully,
        isNewRequirementBeingWritten,
        optionalFields,
    } = UseDateFormContext()

    const { setCurentWindow, loginedPerson: loginedPerson } = UseAppContext()

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
                        Go to the Cash Flow
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
                    <div>категория расхода</div>
                    <div>категория прихода</div>
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
    const { loginedPerson: loginedPerson, setCurentWindow } = UseAppContext()

    const [logPersActReqCommands, setThat] = useState<
        Omit<IRequirementStats, 'userId'>[]
    >(loginedPerson ? loginedPerson.requirements : [])

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
