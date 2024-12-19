import { TUserRequirementStats } from '../../ui-v2/login-window/RegistrationUI'
import { IRequirementFields } from '../requirement-command/interfaces'

export interface IUserData {
    userName: string
    wallet: number
    id: string
    requirements: IRequirementFields[]
}
