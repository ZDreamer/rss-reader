import React, {useRef, useState} from 'react';
import {ISubscriptionTree} from "../../api/ApiFolder";
import ApiFolder, {IFolder} from "../../api/ApiFolder";
import SubscriptionTree from "../../utils/SubscriptionTree";
import classNames from "classnames";
import {Transition} from "react-transition-group";
import {useMutation} from "react-query";
import useMutateFolder from "../../hooks/useMutateFolder";

export type SubscriptionLayoutTreeFolderType = React.FC<{
    tree: ISubscriptionTree,
    folder: IFolder
}>

const animationDuration = 200;

const SubscriptionLayoutTreeFolder: SubscriptionLayoutTreeFolderType = ({
    tree,
    folder
}) => {
    const [isOpened, setIsOpened] = useState(folder.isOpened);
    const childrenContainer = useRef<HTMLUListElement>(document.createElement('ul'));
    const folderDepth = SubscriptionTree.getFolderDepth(folder);

    const folderMutation = useMutateFolder();

    return (
        <li className={classNames('ant-menu-submenu', 'ant-menu-submenu-inline', {
            'ant-menu-submenu-open': isOpened,
            'ant-menu-submenu-active': false, //TODO: active
        })}>
            <div
                className="ant-menu-submenu-title"
                style={{paddingLeft: (folderDepth * 12) + 'px'}}
                onClick={e => {
                    setIsOpened(!isOpened);
                    window.getSelection()?.removeAllRanges();

                    folderMutation.mutate({
                        folder: {id: folder.id, isOpened: !isOpened}
                    });
                }}
            >
                <span
                    className="ant-menu-title-content"
                    onClick={e => {
                        e.stopPropagation();
                        console.log('body click');
                        console.log(folder);
                    }}
                >{folder.title}</span>
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
                            {SubscriptionTree.getFolderSubFolders(folder).map(item => (
                                <SubscriptionLayoutTreeFolder
                                    key={'folder_' + item.id}
                                    tree={tree}
                                    folder={item}
                                />
                            ))}
                        </ul>
                    );
                }}
            </Transition>
        </li>
    );
};

export default SubscriptionLayoutTreeFolder;