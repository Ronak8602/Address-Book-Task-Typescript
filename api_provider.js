export class ApiProvider {
    checkLocalStorage() {
        if (ApiProvider.getFromLocalStorage("users") === null) {
            ApiProvider.setLocalStorage("users", JSON.stringify([]));
        }
    }
    static getFromLocalStorage(key) {
        try {
            let data = localStorage.getItem(key);
            let obj = JSON.parse(data);
            return obj;
        }
        catch (error) {
            console.log(error);
            return [];
        }
    }
    static setLocalStorage(key, value) {
        try {
            localStorage.setItem(key, value);
        }
        catch (error) {
            console.log(error);
        }
    }
}
