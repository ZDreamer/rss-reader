import Api from "./Api";
import {IFeed} from "./ApiFeed";
import {QueryFunctionContext} from "react-query/types/core/types";

export interface IFolder {
    id: number,
    title: string,
    parent: number,
    isOpened: boolean,
}

export interface IFolderNew {
    title: string,
    parent: number
}

export type IFolderPatch = Partial<IFolder> & {id: number}

export interface IFeedTree {
    feeds: IFeed[],
    folders: IFolder[]
}

export default class ApiFolder {
    static async create(folder: IFolderNew) {
        const postData = { ...folder } as Partial<IFolder>;
        delete postData.id;

        return await Api.post('/folders', postData);
    }

    static async modify(folder: IFolderPatch) {
        return await Api.patch(`/folders/${folder.id}`, folder);
    }

    static async getTree(context: QueryFunctionContext) {
        return await Api.get<IFeedTree>(`/folders/get_tree`);
    }
}
