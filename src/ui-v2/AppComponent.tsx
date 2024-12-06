import React, { useEffect, useState } from 'react'
import { UseAppContext } from './context/UseAppContext'
import PersonCardUI from './PersonCardUI'
import AddRequirementForm from './add-req-form/AddRequirementFormWindow'
import TrackComponentUI from './track-component-ui/TrackComponentUI'
import MainMenuRibbon from './MainMenuRibbon/MainMenuRibbon'

const AppComponent = () => {
    const { app, curPage, setCurPage, currentPerson, setCurrentPerson } =
        UseAppContext()

    useEffect(() => {}, [currentPerson])
    useEffect(() => {}, [curPage])

    return (
        <div>
            <div className="main-window__header">
                <MainMenuRibbon />
            </div>
            <div className="main-window__body overflow-y">{curPage}</div>
        </div>
    )
}

export default AppComponent
