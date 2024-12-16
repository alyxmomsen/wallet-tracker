

export interface IServerConnector {
    getUserById():Promise<any>
}


export class ServerConnector implements IServerConnector {
    async getUserById(): Promise<any> {
        
    }
}