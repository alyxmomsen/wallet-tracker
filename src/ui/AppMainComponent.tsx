import React, { useEffect } from 'react'
import { UseAppCtx } from './AppCtxProvider'
import ModalWindow from './ModalWindow'
import { Page } from './Page'
import { UseAppContext } from '../ui-v2/context/UseAppContext'
import PersonCdUi from './PrsnCrdUI'
import AddReqForm from './add-requirements-form/AddReqForm'

const AppMainComponent = () => {
    const { app, currentPerson, setCurrentPerson, curPage, setCurPage } =
        UseAppContext()

    useEffect(() => {
        if (currentPerson) {
            setCurPage(<PersonCdUi person={currentPerson} />)
        } else {
            setCurPage(<div>no page</div>)
        }
    }, [currentPerson])

    return (
        <div>
            <h2>Main Component</h2>
            <div>
                <button className={``}>person</button>
                <button className={``}>track</button>
                <button
                    onClick={() => {
                        const persons = app.getPersons()

                        if (persons.length) {
                            setCurPage(<AddReqForm person={persons[0]} />)
                        }
                    }}
                    className={``}
                >
                    add requirement
                </button>
                <button
                    onClick={() => {
                        const persons = app.getPersons()

                        if (persons.length > 0) {
                            setCurrentPerson(persons[0])
                        } else {
                            alert('no')
                        }
                    }}
                    className={``}
                >
                    login
                </button>
            </div>
            <div>{curPage ? curPage : curPage}</div>
        </div>
    )
}

export default AppMainComponent
