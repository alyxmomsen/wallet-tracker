import React from 'react'

const Button = ({
    title,
    onClickHandler: onClickHandler,
}: {
    title: string
    onClickHandler?: (
        ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => Promise<void>
}) => {
    return (
        <div className="">
            <button
                onClick={(e) => {
                    if (onClickHandler) {
                        onClickHandler(e)
                    }
                }}
                className="btn"
            >
                {title}
            </button>
        </div>
    )
}

export default Button
