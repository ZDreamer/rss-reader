import axios from "axios";
import {IFolder, IFolderNew, IFolderPatch} from "./ApiFolder";
import Api from "./Api";

export interface IFeed {
    id: number,
    title: string
    url: string,
    folders: number[]
}

export interface IFeedNew {
    url: string,
    folders: number[]
}

export type IFeedPatch = Partial<IFeed> & {id: number}

export default class ApiFeed {
    static defaultValue = {
        url: '',
        title: '',
        tags: []
    }

    static async create(feed: IFeedNew) {
        const postData = { ...feed } as Partial<IFeed>;
        delete postData.id;

        return await Api.post('/feeds', postData);
    }

    static async modify(feed: IFeedPatch) {
        return await Api.patch(`/feeds/${feed.id}`, feed);
    }

    static async reload(id: number) {
        return await Api.get(`/feed/${id}/reload`);
    }

    static async remove(id: number) {
        return await Api.remove(`/feeds/${id}`);
    }
}
