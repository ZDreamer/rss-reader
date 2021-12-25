import axios from "axios";

export interface ISubscription {
    title: string
    url: string,
    tagsIds: number[],
    newTagNames?: string[]
}

export default class ApiSubscription {
    static defaultValue = {
        url: '',
        title: '',
        tagsIds: []
    }

    static async save(subscription: ISubscription) {
        return await axios.post('/api/subscription', subscription);
    }
}
