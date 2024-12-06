import React, { useEffect } from 'react'
import { UseAppContext } from './context/UseAppContext'

import MainMenuRibbon from './MainMenuRibbon/MainMenuRibbon'

const AppComponent = () => {
    const { curPage, loginedPerson: currentPerson } = UseAppContext()

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
