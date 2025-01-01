import { IRrequirementsStatsType } from '../requirement-command/interfaces'

export interface IUserStats {
    name: string
    wallet: number
    id: string
    requirements: Omit<IRrequirementsStatsType, 'userId'>[]
    createdTimeStamp: number
    updatedTimeStamp: number
    password: string
}
