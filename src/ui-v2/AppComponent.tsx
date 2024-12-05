import React, { useEffect, useState } from 'react'
import { UseAppContext } from './context/UseAppContext'
import PersonCardUI from './PersonCardUI'
import AddRequirementForm from './add-req-form/AddRequirementForm'
import TrackComponentUI from './track-component-ui/TrackComponentUI'

const AppComponent = () => {
    const { app, curPage, setCurPage, currentPerson, setCurrentPerson } =
        UseAppContext()

    const [isLogined, setIfLoginClicked] = useState(false)

    const [tabs] = useState<{ foo: () => JSX.Element }[]>([])

    useEffect(() => {}, [currentPerson])
    useEffect(() => {}, [curPage])

    return (
        <div>
            <div>
                <button
                    onClick={() => {
                        if (currentPerson) {
                            setCurPage(<PersonCardUI person={currentPerson} />)
                            setIfLoginClicked(false)
                        }
                    }}
                    disabled={currentPerson ? false : true}
                    className={``}
                >
                    person
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
                    add requirement
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
                    track
                </button>
                <button
                    onClick={() => {
                        setIfLoginClicked((cur) => !cur)
                        setCurPage(
                            <div>
                                <h1>login page</h1>
                            </div>
                        )
                    }}
                    disabled={false}
                    className={``}
                >
                    {
                        isLogined ? 'LogOut' : 'LogIn'
                    }
                </button>
                {isLogined
                    ? [
                          ...app.getPersons().map((person) => {
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
                      ]
                    : null}
            </div>
            <div>
                <div>{curPage}</div>
            </div>
        </div>
    )
}

export default AppComponent
