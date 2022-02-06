import React, {useState} from 'react';
import {Button, Dropdown, Menu} from "antd";
import { DownOutlined, FolderOutlined, CloseSquareOutlined, EditOutlined } from '@ant-design/icons';
import useFeedTree from "../../hooks/useFeedTree";
import EditForm from "./EditForm";
import useParamsFolderId from "../../hooks/useParamsFolderId";
import FeedTree from "../../utils/FeedTree";

const FolderMenu: React.FC = () => {
    const activeFolderId = useParamsFolderId();
    const [isEditFormVisible, setIsEditFormVisible] = useState<boolean>(false);
    const {data: tree} = useFeedTree();

    const menu = (
        <Menu onClick={(o) => {
            if (o.key == 'edit') {
                setIsEditFormVisible(true);
            } else if (o.key == 'remove') {
                //Some remove actions
            }
        }}>
            <Menu.Item key="edit" icon={<EditOutlined />}>
                Edit
            </Menu.Item>
            <Menu.Item key="remove" icon={<CloseSquareOutlined />}>
                Remove
            </Menu.Item>
        </Menu>
    );

    return (
        <div>
            <Dropdown
                overlay={menu}
                placement="bottomLeft"
                trigger={['click']}
            >
                <Button>
                    <FolderOutlined /> Folder <DownOutlined/>
                </Button>
            </Dropdown>

            {tree ? (
                <EditForm
                    tree={tree}
                    folderId={activeFolderId}
                    isModalVisible={isEditFormVisible}
                    setIsModalVisible={setIsEditFormVisible}
                />
            ) : ''}
        </div>
    );
};

export default FolderMenu;