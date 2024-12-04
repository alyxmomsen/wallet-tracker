import React from 'react'
import { IPerson } from '../../core/Person'

const TrackComponentUI = ({ person }: { person: IPerson }) => {
    return (
        <div>
            <h2>Track</h2>
            <div>
                {
                    person.getWalletTrackForActualRequirements().map((elem , i) => {
                        return (
                            <div className="bdr pdg flex-box">
                                <div>{i + 1}.</div>
                                <div>{elem.executionDate}</div>
                                <div>{elem.valueBefore}</div> after
                                <div>{elem.value}</div> =
                                <div>{elem.valueAfter}</div>
                            </div>
                        )
                    })
                    // [''].map(elem =><div>foobar</div>)
                }
            </div>
        </div>
    )
}

export default TrackComponentUI
