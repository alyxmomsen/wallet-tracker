import React from 'react'
import { IPerson } from '../core/Person'
import { UseAppContext } from './ApplicationContext'

const Person = ({ person }: { person: IPerson }) => {
    

    const { update } = UseAppContext();

    return (
        <div>
            <h2>Person</h2>
            <div>
                <h3>
                {
                    person.getName()
                }
                </h3>
                {
                    person.getActualRequirements().map(requirement => {
                        return <div>
                            {requirement.getFormatedStringDate()}

                            <button className='btn' onClick={() => {
                                requirement.satisfy(person);
                                update();            
                            }}>exec</button>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Person
