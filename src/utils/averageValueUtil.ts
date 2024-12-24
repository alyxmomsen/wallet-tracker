import { IPerson } from '../core/person/Person'
import { IRequirementStats } from '../core/requirement-command/interfaces'

export function averageValueUtil(
    requirementsAsStats: Omit<IRequirementStats, 'userId'>[]
) {
    const curPerActReqs = requirementsAsStats

    let summ = 0

    curPerActReqs.forEach((requirement) => {
        summ += requirement.value
    })

    return curPerActReqs.length
        ? Math.floor((summ / curPerActReqs.length) * 100) / 100
        : 0
}
