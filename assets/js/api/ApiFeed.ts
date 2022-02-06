import axios from "axios";

export interface IFeedFolder {
    id?: number,
    title?: string
}

export interface IFeed {
    id?: number,
    title: string
    url: string,
    tags: IFeedFolder[]
}

export default class ApiFeed {
    static defaultValue = {
        url: '',
        title: '',
        tags: []
    }

    static async save(feed: IFeed) {
        return await axios.post('/api/feeds', feed);
    }
}
