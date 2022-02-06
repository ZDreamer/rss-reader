import React, {useState} from 'react';
import ApiFeed, {IFeed} from "../../api/ApiFeed";
import {Button} from "antd";
import AddForm from "./AddForm";
import {useMutation, useQueryClient} from "react-query";
import { AppstoreAddOutlined } from '@ant-design/icons';

const FeedAddButton: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const addNewFeedMutation = useMutation((feed: IFeed) => {
        return ApiFeed.save(feed);
    }, {
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries(['feedTree']);
        }
    });

    const onAddNewFeed = async function (feed: IFeed) {
        addNewFeedMutation.mutate(feed);
    };

    return (
        <div>
            <Button onClick={(e) => {
                e.preventDefault();

                setIsModalVisible(true);
            }}><AppstoreAddOutlined /> Add feed</Button>

            <AddForm
                onAddNewFeed={onAddNewFeed}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
            />
        </div>
    );
};

export default FeedAddButton;
