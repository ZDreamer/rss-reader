import {IFolder, IFeedTree} from "../api/ApiFolder";
import {IFeed} from "../api/ApiFeed";

class FeedTreeClass  {
    folderIndex: {
        [index: number]: IFolder;
    } = {};

    feedIndex: {
        [index: number]: {
            [index: number]: number;
        };
    } = {};

    tree: undefined | IFeedTree;

    setTree(tree: IFeedTree) {
        this.tree = tree;

        this.folderIndex = {};
        this.tree.folders.map(folder => {
            this.folderIndex[folder.id] = folder;
        });

        const feedMap : { [index: number]: number } = {};
        this.tree.feeds.map((feed, index) => {
            feed.folders = [];
            feedMap[feed.id] = index;
        });

        this.feedIndex = {};
        this.tree.feedFolders.map(item => {
            this.feedIndex[item.folder_id] = this.feedIndex[item.folder_id] || {};
            this.feedIndex[item.folder_id][item.feed_id] = item.feed_id;

            if (this.tree) {
                this.tree.feeds[feedMap[item.feed_id]].folders.push(item.folder_id);
            }
        });
    }

    assertTree(): asserts this is {tree: IFeedTree, folderIndex: IFolder[]} & this {
        if (!this.tree) {
            throw 'tree is not defined';
        }
    }

    getFolder(folderId: number | string) : IFolder {
        this.assertTree();

        if (typeof folderId == 'string') {
            folderId = parseInt(folderId);
        }

        if (folderId) {
            return this.tree.folders.filter(item => item.id === folderId)[0];
        } else {
            return {
                id: 0,
                title: '',
                parent: this.getRootFolder().id,
                isOpened: true,
            };
        }
    }

    getFeed(feedId: number | string) : IFeed {
        this.assertTree();

        if (typeof feedId == 'string') {
            feedId = parseInt(feedId);
        }

        if (feedId) {
            return this.tree.feeds.filter(item => item.id === feedId)[0];
        } else {
            return {
                id: 0,
                title: '',
                url: '',
                folders: [this.getRootFolder().id] //TODO: Если открыта страница папки то ставить её сюда
            };
        }
    }

    getOpenedFolders(): number[] {
        this.assertTree();

        return this.tree.folders
            .filter(item => item.isOpened)
            .map(item => item.id);
    }

    getRootFolder() : IFolder {
        this.assertTree();

        return this.tree.folders.filter(item => item.parent === 0)[0];
    }

    getFolderSubFolders(folder: IFolder): IFolder[] {
        this.assertTree();

        return this.tree.folders.filter(item => item.parent === folder.id);
    }

    getFolderDepth(folder: IFolder): number {
        this.assertTree();

        let depth = 0;
        while (folder.parent) {
            depth++;

            folder = this.folderIndex[folder.parent];
        }

        return depth;
    }

    getFolderFeeds (folder: IFolder): IFeed[] {
        this.assertTree();

        const feedIndex = this.feedIndex;

        return this.tree.feeds.filter(item => feedIndex[folder.id] && feedIndex[folder.id][item.id]);
    }

    getTreeWithUpdatedFolder(originalTree: IFeedTree, folderToUpdate: Partial<IFolder>): IFeedTree {
        const tree = JSON.parse(JSON.stringify(originalTree));

        for (const i in tree.folders) {
            const folder = tree.folders[i];

            if (folder.id === folderToUpdate.id) {
                tree.folders[i] = {...folder, ...folderToUpdate};
            }
        }

        return tree;
    }

    getTreeWithUpdatedFeed(originalTree: IFeedTree, feedToUpdate: Partial<IFeed>): IFeedTree {
        const tree = JSON.parse(JSON.stringify(originalTree));

        for (const i in tree.feeds) {
            const feed = tree.feeds[i];

            if (feed.id === feedToUpdate.id) {
                tree.feeds[i] = {...feed, ...feedToUpdate};
            }
        }

        return tree;
    }
}

const FeedTree = new FeedTreeClass();

export default FeedTree;
