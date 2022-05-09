import React from 'react';
import {IFeedTree, IFolder} from "../../api/ApiFolder";
import {FeedLayoutTreeFolderType} from "./LayoutTreeFolder";
import {IFeed} from "../../api/ApiFeed";
import classNames from "classnames";
import FeedTree from "../../utils/FeedTree";
import {NavLink} from "react-router-dom";

export type FeedLayoutTreeFeedType = React.FC<{
    tree: IFeedTree,
    folder: IFolder,
    feed: IFeed,
    activeFolderId: number,
    activeFeedId: number
}>

const FeedLayoutTreeFeed: FeedLayoutTreeFeedType = ({
    tree,
    folder,
    feed,
    activeFolderId,
    activeFeedId
}) => {
    const feedDepth = FeedTree.getFolderDepth(folder) + 1;

    //TODO: Не меняется заголовок фида в дереве если его отредактировать
    return (
        <li
            className={classNames('ant-menu-item ant-menu-item-only-child', {
                'ant-menu-item-selected': folder.id == activeFolderId && feed.id == activeFeedId
            })}
            style={{paddingLeft: (feedDepth * 12) + 'px'}}
        >
            <NavLink
                to={'/folder/' + folder.id + '/feed/' + feed.id}
                onClick={e => {
                    e.stopPropagation();
                }}
                className="ant-menu-title-content"
            >{feed.title}</NavLink>
        </li>
    );
};

export default FeedLayoutTreeFeed;