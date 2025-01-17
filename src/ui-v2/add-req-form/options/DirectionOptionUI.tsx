import {
    TDirection,
    UseDateFormContext,
} from '../../context/AddRequirementContextProvider'

const TransactionTypeCode = () => {
    const { transactionTypeCode, setTransactionTypeCode } = UseDateFormContext()

    return (
        <div className="flex-box flex-item bdr pdg">
            <div className="value-color--txt">
                {transactionTypeCode === 0 ? 'Increment' : 'Decrement'}
            </div>
            <div>
                <input
                    onChange={(e) => {
                        if (
                            transactionTypeCode !==
                            Number.parseInt(e.target.value)
                        ) {
                            setTransactionTypeCode(0)
                        }
                    }}
                    checked={transactionTypeCode === 0}
                    value={0}
                    type="radio"
                    className="btn"
                />
                <input
                    onChange={(e) => {
                        if (
                            transactionTypeCode !==
                            Number.parseInt(e.target.value)
                        ) {
                            setTransactionTypeCode(
                                Number.parseInt(e.target.value) as TDirection
                            )
                        }
                    }}
                    checked={transactionTypeCode === 0}
                    value={1}
                    type="radio"
                    className="btn"
                />
            </div>
        </div>
    )
}

export default TransactionTypeCode
