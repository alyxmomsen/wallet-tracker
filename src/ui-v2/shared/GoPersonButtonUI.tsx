import { UseAppContext } from '../context/UseAppContext'
import PersonCardUI from '../PersonCardUI'

const GoPersonButton = () => {
    const {
        setCurentWindow,
        curentWindow,
        user: loginedPerson,
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
