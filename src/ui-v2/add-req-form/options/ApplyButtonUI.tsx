import { UseAppContext } from '../../context/UseAppContext'

import { UseDateFormContext } from '../../context/AddRequirementContextProvider'

const ApplyButtonUI = () => {
    const { app, localStorageService } = UseAppContext()

    const {
        description,
        title,
        value,
        dateToExecute,
        transactionTypeCode,
        setLoading,
        setLoaded,
    } = UseDateFormContext()

    return (
        <div className="flex-box">
            <button
                className="btn"
                onClick={async () => {
                    const authToken = localStorageService.getAuthData()

                    setLoading(true)
                    setLoaded(false)

                    if (authToken === null) return
                    app.addRequirement({
                        transactionTypeCode,
                        dateToExecute,
                        description,
                        title,
                        value,
                        authToken,
                    })

                    setLoading(false)
                    setLoaded(true)
                }}
            >
                Apply
            </button>
        </div>
    )
}

export default ApplyButtonUI
