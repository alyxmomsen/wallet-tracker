import { useState } from 'react'
import TransactionTypeCode from './options/DirectionOptionUI'
import ValueOptionUI from './options/ValueOptionUI'
import TitleOptionUI from './options/TitleOptionUI'
import DateOptionUI from './options/DateOptionUI'
import AddOtherOption from './options/AddOtherOption'
import ApplyButtonUI from './options/ApplyButtonUI'
import { UseDateFormContext } from '../context/AddRequirementContextProvider'
import { UseAppContext } from '../context/UseAppContext'
import GoPersonButton from '../shared/GoPersonButtonUI'
import TrackComponentUI from '../track-component-ui/TrackComponentUI'
/* #warning */
import { IRrequirementsStatsType } from 'cash-flow/dist/core/requirement-command/interfaces'

const AddRequirementFormComponent = () => {
    const {
        isRequirementAddedSuccessfully,
        isNewRequirementBeingWritten,
        optionalFields,
        loaded,
        loading,
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
                    <TransactionTypeCode />
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
            {!loading && loaded ? (
                <div style={{ backgroundColor: 'grey' }} className="pdg">
                    LOADED
                </div>
            ) : loading ? (
                <div style={{ backgroundColor: 'orange' }} className="pdg">
                    LOADING
                </div>
            ) : null}
        </div>
        // {}
    )
}

export default AddRequirementFormComponent

const ThankYouMessageUI = () => {
    const { setIsNewRequirementBeingWritten } = UseDateFormContext()
    const { loginedPerson, setCurentWindow } = UseAppContext()

    const [logPersActReqCommands, setThat] = useState<
        Omit<IRrequirementsStatsType, 'userId' | 'deleted'>[]
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
