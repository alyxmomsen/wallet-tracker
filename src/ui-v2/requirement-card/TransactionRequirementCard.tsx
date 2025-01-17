import { IRrequirementsStatsType } from 'cash-flow/dist/core/requirement-command/interfaces'
import { UseAppContext } from '../context/UseAppContext'
import PersonCardUI from '../user-card/PersonCardUI'
/* #warning */

const TransactionRequirementCard = ({
    requirement,
}: {
    requirement: Omit<IRrequirementsStatsType, 'userId' | 'deleted'>
}) => {
    const { app, setCurentWindow, localStorageService } = UseAppContext()

    return (
        <div>
            <h2>Requirement</h2>
            <h3>title: {requirement.title}</h3>
            <p>
                <b>description:</b> {requirement.description}
            </p>
            <div className="flex-box">
                <div>
                    <button className="btn">execute</button>
                </div>
                <div>
                    <button
                        onClick={() => {
                            const userStats = app.getUserStats()
                            if (userStats) {
                                setCurentWindow(
                                    <PersonCardUI person={userStats} />
                                )
                            }
                        }}
                        className="btn"
                    >
                        go to User
                    </button>
                </div>
                <div>
                    <button className="btn">edit</button>
                </div>
                <div>
                    <button
                        onClick={() => {
                            /* #warning token is not provided */

                            const authdata = localStorageService.getAuthData()

                            if (authdata === null) return

                            app.deleteRequirement(requirement.id, authdata)
                        }}
                        className="btn"
                    >
                        delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TransactionRequirementCard
