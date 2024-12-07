import React, { useEffect } from 'react'
import { UseAppContext } from './context/UseAppContext'

import MainMenuRibbon from './MainMenuRibbon/MainMenuRibbon'

const AppComponent = () => {
    const { curentWindow: curPage } = UseAppContext()

    return (
        <div>
            <div className="main-window__body overflow-y">{curPage}</div>
        </div>
    )
}

export default AppComponent
