import React from 'react';
import {Form, Input, Modal} from 'antd';
import ApiFolder, {IFolder} from "../../api/ApiFolder";
import SubscriptionTree from "../../utils/SubscriptionTree";
import {useMutation, useQueryClient} from "react-query";
import {AuthContext} from "../Auth/AuthProvider";
import {ISubscriptionTree} from "../../api/ApiUser";
import MutationErrors from "../MutationErrors";
import FolderTreeSelect from "./TreeSelect";

export type FolderAddFormType = React.FC<{
    tree: ISubscriptionTree,
    isModalVisible: boolean,
    setIsModalVisible: (isModalVisible: boolean) => void
}>

const FolderAddForm: FolderAddFormType = ({
    tree,
    isModalVisible,
    setIsModalVisible
}) => {
    const [form] = Form.useForm();
    const queryClient = useQueryClient();
    const auth = React.useContext(AuthContext);
    const mutation = useMutation((folder: IFolder) => {
        return ApiFolder.save(folder);
    }, {
        onSuccess: (data, variables, context) => {
            setIsModalVisible(false);

            queryClient.invalidateQueries(['user', auth.user.id, 'subscriptionTree']);
        }
    });

    const addNewFolder = async function (folder: IFolder) {
        mutation.mutate(folder);
    }

    let modalBody;
    if (tree) {
        const folder = SubscriptionTree.getNewFolder();

        modalBody = (
            <Form
                form={form}
                onFinish={addNewFolder}
                initialValues={folder}
            >
                {mutation.error && (
                    <Form.Item>
                        <MutationErrors errorObject={mutation.error} />
                    </Form.Item>
                )}

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
            title="Adding folder"
            okText="Add"
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

export default FolderAddForm;
