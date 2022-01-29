import Api from "./Api";

export interface IFolder {
    id: number,
    title: string,
    parent: number,
    isOpened: boolean,
}

export default class ApiFolder {
    static async save(folder: IFolder) {
        const postData = { ...folder } as Partial<IFolder>;
        if (postData.id === 0) {
            delete postData.id;
        }

        return await Api.post('/folders', postData);
    }
}
