import { TFetchResponse, TFetchUserData } from "../../ui-v2/login-window/RegistrationUI";
import { GetUserService, IGetUserService } from "./get-user-service"

export interface IServerConnector {
    getUserById(id:string): Promise<TFetchResponse<TFetchUserData>>
}

export class ServerConnector implements IServerConnector {

    private getUserService: IGetUserService;



    async getUserById(id: string): Promise<TFetchResponse<TFetchUserData>> {
        const response = await this.getUserService.byId(id);
        return response;
    }

    constructor() {

        this.getUserService = new GetUserService();
    }
}
