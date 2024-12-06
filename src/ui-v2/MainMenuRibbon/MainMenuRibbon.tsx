import React, { useState } from 'react'
import { UseAppContext } from '../context/UseAppContext'
import PersonCardUI from '../PersonCardUI'
import AddRequirementForm from '../add-req-form/AddRequirementFormWindow'
import TrackComponentUI from '../track-component-ui/TrackComponentUI'
import CurrentPersonTabUI from './tabs/CurrentPersonTabUI'
import AddRequirementTabUI from './tabs/AddRequirementTabUI'
import TrackTabUI from './tabs/TrackTabUI'
import LoginButtonTabUI from './tabs/LoginButtonTabUI'

const MainMenuRibbon = () => {
    const { currentPerson, setCurrentPerson, setCurPage, app } = UseAppContext()

    const [isLogined, setIsLogined] = useState(false)
    const [isPersonMenuRolledDown, setIsPersonMenuRolledDown] = useState(false)

    return (
        <div>
            <CurrentPersonTabUI />
            <AddRequirementTabUI />
            <TrackTabUI />
            <LoginButtonTabUI />
        </div>
    )
}

export default MainMenuRibbon
