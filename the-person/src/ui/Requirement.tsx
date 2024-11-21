import React from 'react'

const Requirement = ({
    date,
    title,
    description,
}: {
    date: string
    title: string
    description: string
}) => {
    return (
        <div>
            <h3>requires:</h3>
            <h4>{date}</h4>
            <div>
                <p>{title}</p>
                <p>{description}</p>
                <button
                    onClick={() => {
                        // req.go(person)
                    }}
                >
                    execute
                </button>
            </div>
        </div>
    )
}

export default Requirement
