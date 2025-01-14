import { useContext } from 'react'
import { AppContext, TAppCtx } from './AppContextProvider'

export const UseAppContext = (): TAppCtx => {
    const ctx = useContext(AppContext)

    if (ctx === undefined) {
        throw new Error('oh my god! no context')
    }

    return ctx
}
