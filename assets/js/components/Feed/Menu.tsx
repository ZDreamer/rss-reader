import React, {useState} from 'react';
import useFeedTree from "../../hooks/useFeedTree";
import {useNavigate} from "react-router-dom";
import useMutateFeed from "../../hooks/useMutateFeed";
import {Button, Dropdown, Menu} from "antd";
import {CloseSquareOutlined, DownOutlined, EditOutlined, FolderOutlined} from "@ant-design/icons";
import EditForm from "../Feed/EditForm";

export type FeedMenuType = React.FC<{
    feedId: number
}>

const FeedMenu: FeedMenuType = ({ feedId }) => {
    const [isEditFormVisible, setIsEditFormVisible] = useState<boolean>(false);
    const {data: tree} = useFeedTree();
    const navigate = useNavigate();
    const feedMutation = useMutateFeed({
        onSuccess: () => {
            navigate("/");
        }
    });

    //TODO: Переспрашивать о удалении потока
    const menu = (
        <Menu onClick={(o) => {
            if (o.key == 'edit') {
                setIsEditFormVisible(true)
            } else if (o.key == 'remove') {
                feedMutation.mutate({ action: 'remove', id: feedId })
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
                    <FolderOutlined /> Feed <DownOutlined/>
                </Button>
            </Dropdown>

            {tree ? (
                <EditForm
                    tree={tree}
                    feedId={feedId}
                    isModalVisible={isEditFormVisible}
                    setIsModalVisible={setIsEditFormVisible}
                />
            ) : ''}
        </div>
    );
};

export default FeedMenu;