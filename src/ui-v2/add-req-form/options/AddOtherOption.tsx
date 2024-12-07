import React, { useState } from 'react'
import { UseDateFormContext } from '../../context/AddRequirementContextProvider'

const AddOtherOption = () => {
    const { optionalFields, setOptionalFields } = UseDateFormContext()
    const [isOpened, setIsOpened] = useState(false)

    return (
        <div className="flex-box flex-center flex-item bdr pdg">
            <div>options:</div>
            <div className="flex-box">
                <button
                    className="btn"
                    onClick={() => setIsOpened((cur) => !cur)}
                >
                    +
                </button>
                {isOpened
                    ? optionalFields.map((elem) => (
                          <button
                              onClick={() => {
                                  /// !!!!! ///
                                  elem.setIsActive(!elem.getIsActive())
                                  setOptionalFields(
                                      optionalFields.map((elem) => elem)
                                  )
                                  /// !!!!! ///
                              }}
                              className={'btn'}
                          >
                              {elem.getTitle()}
                          </button>
                      ))
                    : null}
            </div>
        </div>
    )
}

export default AddOtherOption
