import React, { useEffect, useState } from 'react'
import { UseAppContext } from './context/UseAppContext'
import PersonCardUI from './PersonCardUI'
import AddRequirementForm from './add-req-form/AddRequirementForm'
import TrackComponentUI from './track-component-ui/TrackComponentUI'

const AppComponent = () => {
    const { app, curPage, setCurPage, currentPerson, setCurrentPerson } =
        UseAppContext()

    const [isLogined, setIsLogined] = useState(false)
    const [isPersonMenuRolledDown, setIsPersonMenuRolledDown] = useState(false)

    useEffect(() => {}, [currentPerson])
    useEffect(() => {}, [curPage])

    return (
        <div>
            <div>
                <button
                    onClick={() => {
                        if (currentPerson) {
                            setCurPage(<PersonCardUI person={currentPerson} />)
                            setIsLogined(false)
                        }
                    }}
                    disabled={currentPerson ? false : true}
                    className={``}
                >
                    {currentPerson ? currentPerson.getName() : 'Person'}
                </button>
                <button
                    onClick={() => {
                        if (currentPerson) {
                            setCurPage(
                                <AddRequirementForm person={currentPerson} />
                            )
                        }
                    }}
                    disabled={currentPerson ? false : true}
                    className={``}
                >
                    Add requirement
                </button>
                <button
                    onClick={() => {
                        if (currentPerson) {
                            setCurPage(
                                <TrackComponentUI person={currentPerson} />
                            )
                        }
                    }}
                    disabled={currentPerson ? false : true}
                    className={``}
                >
                    Track
                </button>
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
                    className={``}
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
            <div>
                <div>{curPage}</div>
            </div>
        </div>
    )
}

export default AppComponent
