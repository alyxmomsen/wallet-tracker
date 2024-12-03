import React from 'react'
import { UseDateContext } from './AddRequirementContext'
import { UseAppCtx } from '../AppCtxProvider'

const AddTimeForm = () => {
    const {
        setHours,
        hours,
        setMinutes,
        minutes,
        month,
        date: day,
        year,
    } = UseDateContext()

    const { setModals, modals } = UseAppCtx()
    return (
        <div className="pdg bdr">
            <header className="flex-box">
                <div>TiME</div>
                <button
                    className="btn"
                    onClick={() => {
                        setModals([
                            ...modals.filter((elem) => elem !== modals.pop()),
                        ])
                    }}
                >
                    fuck off, bich
                </button>
            </header>
            <section className="flex-box">
                <div className="pdg bdr">
                    <h6>{'hours:'}</h6>
                    <div>
                        <input
                            onChange={(e) => {
                                const value = Number.parseInt(
                                    e.currentTarget.value
                                )

                                setHours(
                                    value > 23 ? 0 : value < 0 ? 23 : value
                                )
                            }}
                            placeholder="hours"
                            type="number"
                            value={hours}
                        />
                    </div>
                </div>
                <div className="pdg bdr">
                    <h6>minutes</h6>
                    <div>
                        <input
                            onChange={(e) => {
                                const value = Number.parseInt(
                                    e.currentTarget.value
                                )

                                setMinutes(
                                    value > 59
                                        ? (() => 0)()
                                        : value < 0
                                          ? 59
                                          : value
                                )
                            }}
                            placeholder="minutes"
                            type="number"
                            value={minutes}
                        />
                    </div>
                </div>
            </section>
            <footer>footer</footer>
        </div>
    )
}

export default AddTimeForm
