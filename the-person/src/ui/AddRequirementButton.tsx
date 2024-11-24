import React from 'react'
import { UseDateContext } from './AddRequirementForm'
import { IPerson } from '../core/Person'
import { Requirement } from '../core/Requirement'
import { DecrementMoneyRequirementCommand, IncrementValueRequirementCommand } from '../core/RequirementCommand'
import { UseAppContext } from './ApplicationContext'

const AddRequirementButton = ({person}:{person:IPerson}) => {

    const {
        setHours,
        hours,
        setMinutes,
        minutes,
        month,
        date: day,
        year,
        transactionType,
        transactionValue,
    } = UseDateContext()


    const { update}=UseAppContext();

  return (
    <div className="pdg bdr">
                        <button
                            className="btn pdg"
                            onClick={() => {
                                person.addRequirement(
                                    new Requirement(
                                        'some requirement',
                                        transactionType === 'dec'
                                            ? new DecrementMoneyRequirementCommand(
                                                  transactionValue
                                              )
                                            : new IncrementValueRequirementCommand(
                                                  transactionValue
                                              ),
                                        new Date(
                                            `${month}-${day}-${year} ${hours}:${minutes}`
                                        )
                                    )
                                )

                                update()
                            }}
                        >
                            add requirement
                        </button>
                    </div>
  )
}

export default AddRequirementButton