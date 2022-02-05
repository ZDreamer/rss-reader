import axios, {AxiosError, AxiosResponse} from "axios";

const client = (() => {
    return axios.create({
        baseURL: "/api"
    });
})();

const request = async function<Type>(
    method: "GET" | "POST" | "PATCH",
    url: string,
    data: unknown = {}
): Promise<Type> {
    const onSuccess = function (response: AxiosResponse<Type>) {
        return response.data;
    };

    const onError = function (error: AxiosError<unknown>) {
        return Promise.reject(error.response);
    };

    return client({
        url,
        method,
        data,
        headers: {
            Accept: 'application/json',
            'Content-Type': method == 'PATCH' ? 'application/merge-patch+json' : 'application/json'
        }
    }).then(onSuccess).catch(onError);
};

const Api = {
    get: async function<Type>(url: string): Promise<Type> {
        return await request('GET', url);
    },

    post: async function<Type>(url: string, data: unknown): Promise<Type> {
        return await request('POST', url, data);
    },

    patch: async function<Type>(url: string, data: unknown): Promise<Type> {
        return await request('PATCH', url, data);
    }
};

export default Api;