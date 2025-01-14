import { IRrequirementsStatsType } from "cash-flow/dist/core/requirement-command/interfaces"

export function averageValueUtil(
    requirementsAsStats: Omit<IRrequirementsStatsType, 'userId' | 'deleted'>[]
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
