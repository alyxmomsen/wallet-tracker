export interface ILocalStorageManagementService {
    setAuthData(value: string): any
    getAuthData():string|null;
}

export class LocalStorageManagementService
    implements ILocalStorageManagementService
{
    setAuthData(value: string) {
        window.localStorage.setItem('userId' , value);
    }
    getAuthData(): string | null {

        const value = window.localStorage.getItem('userId');

        return value;
    }
}
