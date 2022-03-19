import React, {useRef, useState} from 'react';
import {IFeedTree, IFolder} from "../../api/ApiFolder";
import FeedTree from "../../utils/FeedTree";
import classNames from "classnames";
import {Transition} from "react-transition-group";
import useMutateFolder from "../../hooks/useMutateFolder";
import {NavLink} from "react-router-dom";
import FeedLayoutTreeFeed from "./LayoutTreeFeed";

export type FeedLayoutTreeFolderType = React.FC<{
    tree: IFeedTree,
    folder: IFolder,
    activeFolderId: number,
    activeFeedId: number
}>

const animationDuration = 200;

const FeedLayoutTreeFolder: FeedLayoutTreeFolderType = ({
    tree,
    folder,
    activeFolderId,
    activeFeedId
}) => {
    const [isOpened, setIsOpened] = useState(folder.isOpened);
    const childrenContainer = useRef<HTMLUListElement>(document.createElement('ul'));
    const folderDepth = FeedTree.getFolderDepth(folder);

    const folderMutation = useMutateFolder();

    return (
        <li className={classNames('ant-menu-submenu', 'ant-menu-submenu-inline', {
            'ant-menu-submenu-open': isOpened,
        })}>
            <div
                className={classNames('ant-menu-submenu-title', {
                    'ant-menu-submenu-active': folder.id == activeFolderId
                })}
                style={{paddingLeft: (folderDepth * 12) + 'px'}}
                onClick={e => {
                    setIsOpened(!isOpened);
                    window.getSelection()?.removeAllRanges();

                    folderMutation.mutate({
                        action: 'update',
                        folder: {id: folder.id, isOpened: !isOpened}
                    });
                }}
            >
                <NavLink
                    to={'/folder/' + folder.id}
                    onClick={e => {
                        e.stopPropagation();
                    }}
                    className="ant-menu-title-content"
                >{folder.title}</NavLink>
                <i className="ant-menu-submenu-arrow" />
            </div>

            <Transition in={isOpened} timeout={animationDuration}>
                {state => {
                    const styleList: React.CSSProperties = {};


                    if ((state == 'entering' && isOpened) || (state == 'entered' && !isOpened)) {
                        styleList.height = childrenContainer.current.scrollHeight + 'px';
                        styleList.opacity = 1;
                    } else if ((state == 'exited' && isOpened) || (state == 'exiting' && !isOpened)) {
                        //По непонятной причине без этой строчки схлопывание происходит мгновенно, без анимации.
                        //Вот тут вроде про это говорят https://habr.com/ru/post/475520/comments/#comment_20880518
                        childrenContainer.current.scrollHeight;

                        styleList.height = '0px';
                        styleList.opacity = 0;
                    } else if (state == 'exited' && !isOpened) {
                        styleList.display = 'none';
                    }

                    if (styleList.height) {
                        styleList.transition = `height ${animationDuration}ms, opacity ${animationDuration}ms`;
                        styleList.overflow = 'hidden';
                    }

                    return (
                        <ul
                            ref={childrenContainer}
                            className={classNames('ant-menu', 'ant-menu-sub', 'ant-menu-inline', state)}
                            style={styleList}
                        >
                            {FeedTree.getFolderSubFolders(folder).map(item => (
                                <FeedLayoutTreeFolder
                                    key={'folder_' + item.id}
                                    tree={tree}
                                    folder={item}
                                    activeFolderId={activeFolderId}
                                    activeFeedId={activeFeedId}
                                />
                            ))}

                            {FeedTree.getFolderFeeds(folder).map(feed => (
                                <FeedLayoutTreeFeed
                                    key={'folder_' + folder.id + '_feed_' + feed.id}
                                    tree={tree}
                                    folder={folder}
                                    feed={feed}
                                    activeFolderId={activeFolderId}
                                    activeFeedId={activeFeedId}
                                />
                            ))}
                        </ul>
                    );
                }}
            </Transition>
        </li>
    );
};

export default FeedLayoutTreeFolder;