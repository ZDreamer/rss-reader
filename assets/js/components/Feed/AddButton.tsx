import React, {useState} from 'react';
import {Button} from "antd";
import {AppstoreAddOutlined} from '@ant-design/icons';
import useFeedTree from "../../hooks/useFeedTree";
import EditForm from "./EditForm";

const FeedAddButton: React.FC = () => {
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [isEditFormVisible, setIsEditFormVisible] = useState<boolean>(false);
    const {data: tree} = useFeedTree();

    return (
        <div>
            <Button
                loading={isClicked && !tree}
                onClick={(e) => {
                    e.preventDefault();

                    setIsClicked(true);
                    setIsEditFormVisible(true);
                }}
            ><AppstoreAddOutlined /> Add feed</Button>

            {tree ? (
                <EditForm
                    tree={tree}
                    feedId={0}
                    isModalVisible={isEditFormVisible}
                    setIsModalVisible={setIsEditFormVisible}
                />
            ) : ''}
        </div>
    );
};

export default FeedAddButton;
