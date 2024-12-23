import { TUserRequirementStats } from '../../ui-v2/login-window/RegistrationUI'
import { IRequirementStats } from '../requirement-command/interfaces'

export interface IUserData {
    userName: string
    wallet: number
    id: string
    requirements: IRequirementStats[]
}
