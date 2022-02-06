import React, {useState} from 'react';
import {Button} from "antd";
import EditForm from "./EditForm";
import useFeedTree from "../../hooks/useFeedTree";
import { FolderAddOutlined } from '@ant-design/icons';

const FolderAddButton: React.FC = () => {
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
            ><FolderAddOutlined /> Add folder</Button>

            {tree ? (
                <EditForm
                    tree={tree}
                    folderId={0}
                    isModalVisible={isEditFormVisible}
                    setIsModalVisible={setIsEditFormVisible}
                />
            ) : ''}
        </div>
    );
};

export default FolderAddButton;