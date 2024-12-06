import React from 'react'
import { UseAppContext } from '../../context/UseAppContext'
import TrackComponentUI from '../../track-component-ui/TrackComponentUI'

const TrackTabUI = () => {
    const { loginedPerson: currentPerson, setCurPage } = UseAppContext()
    return (
        <button
            onClick={() => {
                if (currentPerson) {
                    setCurPage(<TrackComponentUI person={currentPerson} />)
                }
            }}
            disabled={currentPerson ? false : true}
            className={`main-menu__button btn`}
        >
            Track
        </button>
    )
}

export default TrackTabUI
