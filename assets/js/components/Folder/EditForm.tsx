import React from 'react';
import {Form, Input, Modal} from 'antd';
import {IFolderNew, IFeedTree, IFolderPatch} from "../../api/ApiFolder";
import FeedTree from "../../utils/FeedTree";
import MutationErrors from "../MutationErrors";
import FolderTreeSelect from "./TreeSelect";
import useMutateFolder from "../../hooks/useMutateFolder";

export type FolderEditFormType = React.FC<{
    tree: IFeedTree,
    folderId: number,
    isModalVisible: boolean,
    setIsModalVisible: (isModalVisible: boolean) => void
}>

const FolderEditForm: FolderEditFormType = ({
    tree,
    folderId,
    isModalVisible,
    setIsModalVisible
}) => {
    const [form] = Form.useForm();
    const mutation = useMutateFolder({
        onSuccess: () => {
            setIsModalVisible(false);
        }
    });

    const editFolder = async function (folder: IFolderNew | IFolderPatch) {
        if ('id' in folder) {
            mutation.mutate({
                action: 'update',
                folder: folder
            });
        } else {
            mutation.mutate({
                action: 'create',
                folder: folder
            });
        }
    }

    let modalBody;
    if (tree) {
        const folder = FeedTree.getFolder(folderId);

        modalBody = (
            <Form
                form={form}
                onFinish={editFolder}
                initialValues={folder}
                labelCol={{span: 4}}
            >
                {mutation.error && (
                    <Form.Item>
                        <MutationErrors errorObject={mutation.error} />
                    </Form.Item>
                )}

                { folder.id ? (
                    <Form.Item name="id" style={{display: 'none'}}>
                        <Input />
                    </Form.Item>
                ) : ''}

                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input folder title',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Parent"
                    name="parent"
                    style={folder.parent ? {} : {display: 'none'}}
                >
                    <FolderTreeSelect tree={tree} />
                </Form.Item>
            </Form>
        );
    } else {
        modalBody = 'Loading...';
    }

    return (
        <Modal
            title={folderId ? "Editing folder" : "Adding folder"}
            okText={folderId ? "Save" : "Add"}
            visible={isModalVisible}

            onOk={() => {
                form.submit();
            }}
            onCancel={() => {
                setIsModalVisible(false);
            }}
            afterClose={() => {
                mutation.reset();
                form.resetFields();
            }}
        >
            {modalBody}
        </Modal>
    );
};

export default FolderEditForm;
