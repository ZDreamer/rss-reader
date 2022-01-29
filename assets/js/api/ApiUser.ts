import {IFolder} from "./ApiFolder";
import {ISubscription} from "./ApiSubscription";
import Api from "./Api";
import {QueryFunctionContext} from "react-query/types/core/types";

export interface ISubscriptionTree {
    subscriptions: ISubscription[],
    folders: IFolder[]
}

export default class ApiUser {
    static async getSubscriptionTree(context: QueryFunctionContext) {
        const userId = context.queryKey[1];

        return await Api.get<ISubscriptionTree>(`/users/${userId}/get_subscription_tree`);
    }
}