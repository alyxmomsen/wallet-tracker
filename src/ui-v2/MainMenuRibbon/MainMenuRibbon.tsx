import React, { useState } from 'react'
import { UseAppContext } from '../context/UseAppContext'
import PersonCardUI from '../PersonCardUI'
import AddRequirementForm from '../add-req-form/AddRequirementFormWindow'
import TrackComponentUI from '../track-component-ui/TrackComponentUI'
import CurrentPersonTabUI from './tabs/CurrentPersonTabUI'
import AddRequirementTabUI from './tabs/AddRequirementTabUI'

const MainMenuRibbon = () => {
    const { currentPerson, setCurrentPerson, setCurPage, app } = UseAppContext()

    const [isLogined, setIsLogined] = useState(false)
    const [isPersonMenuRolledDown, setIsPersonMenuRolledDown] = useState(false)

    return (
        <div>
            <CurrentPersonTabUI />
            <AddRequirementTabUI />

            <button
                onClick={() => {
                    if (currentPerson) {
                        setCurrentPerson(null)
                        setIsLogined(false)
                        setIsPersonMenuRolledDown(false)
                        return
                    }
                    // setIsLogined((cur) => !cur)
                    setIsPersonMenuRolledDown((cur) => !cur)
                    setCurPage(
                        <div>
                            <h1>Login page</h1>
                        </div>
                    )
                }}
                disabled={false}
                className={`main-menu__button btn`}
            >
                {currentPerson ? 'LogOut' : 'LogIn'}
            </button>
            {isPersonMenuRolledDown && !currentPerson ? (
                <div>
                    {[
                        ...app
                            .getPersons()
                            .filter((person) => {
                                return !currentPerson
                                    ? true
                                    : currentPerson === person
                            })
                            .map((person) => {
                                return (
                                    <button
                                        className="btn main-menu__button"
                                        onClick={() => {
                                            setCurrentPerson(person)
                                        }}
                                    >
                                        {person.getName()}
                                    </button>
                                )
                            }),
                    ]}
                </div>
            ) : null}
        </div>
    )
}

export default MainMenuRibbon
