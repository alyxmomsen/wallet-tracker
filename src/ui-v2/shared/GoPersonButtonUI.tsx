import { UseAppContext } from '../context/UseAppContext'
import PersonCardUI from '../user-card/PersonCardUI'

const GoPersonButton = () => {
    const {
        setCurentWindow,
        curentWindow,
        loginedPerson: loginedPerson,
    } = UseAppContext()

    return (
        <div>
            <button
                className="btn"
                onClick={() => {
                    if (loginedPerson) {
                        setCurentWindow(<PersonCardUI person={loginedPerson} />)
                    }
                }}
            >
                go person
            </button>
        </div>
    )
}

export default GoPersonButton
