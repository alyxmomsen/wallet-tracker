import React, { createContext, useContext, useEffect, useState } from 'react'
import { ApplicationSingletoneFacade } from '../core/ApplicationFacade'
import { IPerson, OrdinaryPerson } from '../core/Person'
import { Requirement } from '../core/Requirement'
import { DecrementMoneyRequirementCommand } from '../core/RequirementCommand'

export type AppContextValue = {
    service: ApplicationSingletoneFacade
    update: () => void
    currentPerson: IPerson | null
    modals: JSX.Element[]
    setModals: (elems: JSX.Element[]) => void
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

    useEffect(() => {
        // updateCB();
    }, [appService])

    return (
        <ApplicationContext.Provider
            value={{
                service: appService,
                update: updateCB,
                currentPerson: appService.getPersons().length
                    ? appService.getPersons()[0]
                    : null,
                modals,
                setModals: (elems: JSX.Element[]) => setModals([...elems]),
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
