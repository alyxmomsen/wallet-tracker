import React, { createContext, useContext, useEffect, useState } from 'react'
import { ApplicationSingletoneFacade } from '../core/ApplicationFacade'
import { IPerson, OrdinaryPerson, Person } from '../core/Person'
import { Requirement } from '../core/Requirement'
import { DecrementMoneyRequirementCommand } from '../core/RequirementCommand'
import { IPage, Page } from './Page'
import AppMainComponent from './AppMainComponent'
import PersonCardUI from './PersonCardUI'
import PersonPreviewUI from './PersonPreviewUI'

export type AppContextValue = {
    service: ApplicationSingletoneFacade
    currentPerson: IPerson | null
    modals: JSX.Element[]
    currentPage: IPage
    pages: IPage[]
    update: () => void
    setModals: (elems: JSX.Element[]) => void
    setCurrentPage: (elem: JSX.Element) => void
}

const ApplicationContext = createContext<AppContextValue | undefined>(undefined)

const AppContextProvider = ({
    children,
    updateCB,
}: {
    children: JSX.Element
    updateCB: () => void
}): JSX.Element => {
    // const appService = ApplicationSingletoneFacade.Instance()
    const appService = new ApplicationSingletoneFacade()

    const [modals, setModals] = useState<JSX.Element[]>([])

    const [curPage, setCurpage] = useState<IPage>(new Page(<div>no page</div>))
    const [pages, setPages] = useState<IPage[]>([
        // new Page(<PersonPreviewUI  />)
    ])
    const [person, setPerson] = useState<IPerson | null>(
        initPersonValue(appService)
    )

    useEffect(() => {
        if (person) {
            setCurpage(new Page(<PersonPreviewUI person={person} />))
        } else {
            setCurpage(new Page(<div>no page</div>))
        }
    }, [person])

    useEffect(() => {
        // updateCB();
    }, [appService])

    return (
        <ApplicationContext.Provider
            value={{
                service: appService,
                currentPerson: appService.getPersons().length
                    ? appService.getPersons()[0]
                    : null,
                modals,
                currentPage: curPage,
                pages: [],
                update: updateCB,
                setModals: (elems: JSX.Element[]) => setModals([...elems]),
                setCurrentPage: (elem: JSX.Element) => {
                    setCurpage(new Page(elem))
                },
            }}
        >
            {children}
        </ApplicationContext.Provider>
    )
}

export const UseAppContext = (): AppContextValue => {
    const ctx = useContext(ApplicationContext)

    if (ctx === undefined) {
        console.error('ERRRROOOOOORRRRRR')
        throw new Error('useAppContext must be used within an AppProvider')
    }

    return ctx
}

export default AppContextProvider

function initPersonValue(appService: ApplicationSingletoneFacade) {
    const persons: IPerson[] = appService.getPersons()

    return persons.length ? persons[0] : null
}
