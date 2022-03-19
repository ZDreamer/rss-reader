import React, {useEffect} from 'react';
import {Form, Input, Modal} from 'antd';
import {IFeedTree} from "../../api/ApiFolder";
import FeedTree from "../../utils/FeedTree";
import MutationErrors from "../MutationErrors";
import FolderTreeSelect from "../Folder/TreeSelect";
import useMutateFeed from "../../hooks/useMutateFeed";
import {IFeedNew, IFeedPatch} from "../../api/ApiFeed";

export type FeedEditFormType = React.FC<{
    tree: IFeedTree,
    feedId: number,
    isModalVisible: boolean,
    setIsModalVisible: (isModalVisible: boolean) => void
}>

const FeedEditForm: FeedEditFormType = ({
    tree,
    feedId,
    isModalVisible,
    setIsModalVisible
}) => {
    const [form] = Form.useForm();
    const mutation = useMutateFeed({
        onSuccess: () => {
            setIsModalVisible(false);
        }
    });

    const editFeed = async function (feed: IFeedNew | IFeedPatch) {
        if ('id' in feed) {
            mutation.mutate({ action: 'update', feed: feed });
        } else {
            mutation.mutate({ action: 'create', feed: feed });
        }
    }

    useEffect(() => {
        if (isModalVisible) {
            mutation.reset();
            form.resetFields();
        }
    }, [isModalVisible]);

    let modalBody;
    if (tree) {
        const feed = FeedTree.getFeed(feedId);

        modalBody = ( //TODO: Align fields и labels in the form
            <Form
                form={form}
                onFinish={editFeed}
                initialValues={feed}
            >
                {mutation.error && (
                    <Form.Item>
                        <MutationErrors errorObject={mutation.error} />
                    </Form.Item>
                )}

                { feed.id ? (
                    <Form.Item name="id" style={{display: 'none'}}>
                        <Input />
                    </Form.Item>
                ) : ''}

                { feed.id ? (
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: 'Please input feed title',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                ) : ''}

                <Form.Item
                    label="Url"
                    name="url"
                    rules={[
                        {
                            required: true,
                            message: 'Please input feed url',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Folders"
                    name="folders"
                    rules={[
                        {
                            required: true,
                            message: 'Please select at least one folder',
                        },
                    ]}
                >
                    <FolderTreeSelect tree={tree} multiple={true} />
                </Form.Item>
            </Form>
        );
    } else {
        modalBody = 'Loading...';
    }

    return (
        <Modal
            title={feedId ? "Editing feed" : "Adding feed"}
            okText={feedId ? "Save" : "Add"}
            visible={isModalVisible}

            onOk={() => {
                form.submit();
            }}
            onCancel={() => {
                setIsModalVisible(false);
            }}
        >
            {modalBody}
        </Modal>
    );
};

export default FeedEditForm;
