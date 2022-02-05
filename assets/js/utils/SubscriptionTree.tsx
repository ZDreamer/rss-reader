import {IFolder, ISubscriptionTree} from "../api/ApiFolder";

class SubscriptionTreeClass  {
    folderIndex: undefined | IFolder[];

    tree: undefined | ISubscriptionTree;

    setTree(tree: ISubscriptionTree) {
        this.tree = tree;

        const folderIndex: IFolder[] = [];
        this.tree.folders.map(folder => {
            folderIndex[folder.id] = folder;
        });

        this.folderIndex = folderIndex;
    }

    assertTree(): asserts this is {tree: ISubscriptionTree, folderIndex: IFolder[]} & this {
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

    getTreeWithUpdatedFolder(originalTree: ISubscriptionTree, folderToUpdate: Partial<IFolder>): ISubscriptionTree {
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

const SubscriptionTree = new SubscriptionTreeClass();

export default SubscriptionTree;
