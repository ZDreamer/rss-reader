import {IFolder, IFeedTree} from "../api/ApiFolder";

class FeedTreeClass  {
    folderIndex: undefined | IFolder[];

    tree: undefined | IFeedTree;

    setTree(tree: IFeedTree) {
        this.tree = tree;

        const folderIndex: IFolder[] = [];
        this.tree.folders.map(folder => {
            folderIndex[folder.id] = folder;
        });

        this.folderIndex = folderIndex;
    }

    assertTree(): asserts this is {tree: IFeedTree, folderIndex: IFolder[]} & this {
        if (!this.tree) {
            throw 'tree is not defined';
        }
    }

    getNewFolder() : IFolder {
        return {
            id: 0,
            title: '',
            parent: this.getRootFolder().id,
            isOpened: true,
        };
    }

    getFolder(folderId: number) : IFolder {
        this.assertTree();

        return this.tree.folders.filter(item => item.id === folderId)[0];
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
}

const FeedTree = new FeedTreeClass();

export default FeedTree;
