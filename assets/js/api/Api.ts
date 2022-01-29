import axios, {AxiosError, AxiosResponse} from "axios";

const client = (() => {
    return axios.create({
        baseURL: "/api",
        headers: {
            common: {
                Accept: 'application/json'
            }
        }
    });
})();

const request = async function<Type>(
    method: "GET" | "POST",
    url: string,
    data: unknown = {}
): Promise<Type> {
    const onSuccess = function (response: AxiosResponse<Type>) {
        return response.data;
    };

    const onError = function (error: AxiosError<unknown>) {
        return Promise.reject(error.response);
    };

    // adding success and error handlers to client
    return client({ method, url, data }).then(onSuccess).catch(onError);
};

const Api = {
    get: async function<Type>(url: string): Promise<Type> {
        return await request('GET', url);
    },

    post: async function<Type>(url: string, data: unknown): Promise<Type> {
        return await request('POST', url, data);
    }
};

export default Api;