import { TFetchUserRequirementStats } from '../../ui-v2/login-window/RegistrationUI'

export interface IUserData {
    userName: string
    wallet: number
    id: string
    requirements: TFetchUserRequirementStats[]
}
