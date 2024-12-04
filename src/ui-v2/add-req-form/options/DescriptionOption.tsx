// import React from 'react'

// const DescriptionOption = () => {
//   return (
//     <div>DescriptionOption</div>
//   )
// }

// export default DescriptionOption

import React, { useState } from 'react'
import { UseDateFormContext } from '../../context/AddRequirementContextProvider'

const DescriptionOptionUI = () => {
    const { description, setDescription } = UseDateFormContext()

    return (
        <div className="flex-box ">
            <div>description:</div>
            <div>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
        </div>
    )
}

export default DescriptionOptionUI
