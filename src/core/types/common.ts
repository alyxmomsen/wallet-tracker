import { TUserRequirementStats } from '../../ui-v2/login-window/RegistrationUI'

export interface IUserData {
    userName: string
    wallet: number
    id: string
    requirements: TUserRequirementStats[]
}
