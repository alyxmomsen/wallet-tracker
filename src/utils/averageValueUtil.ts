import { IPerson } from '../core/person/Person'

export function averageValueUtil(person: IPerson) {
    const curPerActReqs = person.getActualRequirementCommands()

    let summ = 0
    curPerActReqs.forEach((elem) => {
        summ += elem.getValue()
    })

    return curPerActReqs.length
        ? Math.floor((summ / curPerActReqs.length) * 100) / 100
        : 0
}
