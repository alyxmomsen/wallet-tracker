import { UseAppContext } from './context/UseAppContext'

const AppComponent = () => {
    const { curentWindow: curPage } = UseAppContext()

    return (
        <div>
            <div className="main-window__body overflow-y">{curPage}</div>
        </div>
    )
}

export default AppComponent
