import React, {useState} from 'react';
import {Button} from "antd";
import AddForm from "./AddForm";
import useSubscriptionTree from "../../hooks/useSubscriptionTree";

const FolderAddButton: React.FC = () => {
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const {data: tree} = useSubscriptionTree();

    return (
        <div>
            <Button
                loading={isClicked && !tree}
                onClick={(e) => {
                    e.preventDefault();

                    setIsClicked(true);
                    setIsModalVisible(true);
                }}
            >Add folder</Button>

            {tree ? (
                <AddForm
                    tree={tree}
                    isModalVisible={isModalVisible}
                    setIsModalVisible={setIsModalVisible}
                />
            ) : ''}
        </div>
    );
};

export default FolderAddButton;