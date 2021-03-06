import React, {useState} from 'react';
import {Button, Dropdown, Menu} from "antd";
import {CloseSquareOutlined, DownOutlined, EditOutlined, FolderOutlined} from '@ant-design/icons';
import useFeedTree from "../../hooks/useFeedTree";
import EditForm from "./EditForm";
import {useNavigate} from "react-router-dom";
import useMutateFolder from "../../hooks/useMutateFolder";

export type FolderMenuType = React.FC<{
    folderId: number
}>

const FolderMenu: FolderMenuType = ({ folderId}) => {
    const [isEditFormVisible, setIsEditFormVisible] = useState<boolean>(false);
    const {data: tree} = useFeedTree();
    const navigate = useNavigate();
    const folderMutation = useMutateFolder({
        onSuccess: () => {
            navigate("/");
        }
    });

    const menu = (
        <Menu onClick={(o) => {
            if (o.key == 'edit') {
                setIsEditFormVisible(true)
            } else if (o.key == 'remove') {
                folderMutation.mutate({ action: 'remove', id: folderId })
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
                    folderId={folderId}
                    isModalVisible={isEditFormVisible}
                    setIsModalVisible={setIsEditFormVisible}
                />
            ) : ''}
        </div>
    );
};

export default FolderMenu;