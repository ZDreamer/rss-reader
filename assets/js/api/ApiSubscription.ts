import axios from "axios";

export interface ISubscriptionTag {
    id?: number,
    title?: string
}

export interface ISubscription {
    id?: number,
    title: string
    url: string,
    tags: ISubscriptionTag[]
}

export default class ApiSubscription {
    static defaultValue = {
        url: '',
        title: '',
        tags: []
    }

    static async save(subscription: ISubscription) {
        return await axios.post('/api/subscriptions', subscription);
    }
}
