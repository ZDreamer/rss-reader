import axios from "axios";

export interface ISubscriptionTag {
    id?: number,
    title?: string
}

export interface ISubscription {
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

    static async getTree() {
        return await axios.get('/api/subscriptions');
    }
}
