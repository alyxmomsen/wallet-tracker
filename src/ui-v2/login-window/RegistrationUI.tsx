import React from 'react'

const RegistrationUI = () => {
    return (
        <div className="flex-box flex-dir-col bdr pdg-x3 flex-item">
            <div className="flex-box flex-jtf-btw">
                <span>first name</span>
                <input placeholder={'tape you first name'} type="text" />
            </div>
            <div className="flex-box flex-jtf-btw">
                <span>second name</span>
                <input placeholder={'tape you second name'} type="text" />
            </div>
            <div className="flex-box flex-jtf-btw">
                <span>password</span>
                <input placeholder={'tape you second name'} type="password" />
            </div>
            <div className="flex-box flex-jtf-btw">
                <span>password</span>
                <input placeholder={'tape you second name'} type="password" />
            </div>
            <div></div>
        </div>
    )
}

export default RegistrationUI
