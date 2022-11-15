
export class ApiProvider {
    public checkLocalStorage(): void {
        if (ApiProvider.getFromLocalStorage("users") === null) {
            ApiProvider.setLocalStorage("users", JSON.stringify([]));
        }
    }

    static getFromLocalStorage(key: string): Array<Contact> {
        try {
            let data: string = localStorage.getItem(key)!;
            let obj: Array<Contact> = JSON.parse(data);
            return obj;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    static setLocalStorage(key: string, value: string): void {
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            console.log(error);
        }
    }


}

export interface Contact {
    key: string,
    name: string,
    email: string,
    mobile: string,
    landline: string,
    website: string,
    address: string
}

