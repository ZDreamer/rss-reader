import React, {useState} from 'react';
import ApiFeed, {IFeed} from "../../api/ApiFeed";
import {Input, Modal, Space, Select} from 'antd';

export type FeedAddFormType = React.FC<{
    isModalVisible: boolean,
    setIsModalVisible: (isModalVisible: boolean) => void,
    onAddNewFeed: (feed: IFeed) => void
}>

const {Option} = Select;
const tagIdPrefix = 'FeedAddFormTagIdPrefix_';
const tagIdPrefixRegExp = /FeedAddFormTagIdPrefix_\d+/;

const FeedAddForm: FeedAddFormType = ({
    isModalVisible,
    setIsModalVisible,
    onAddNewFeed
}) => {
    const [feed, setFeed] = useState<IFeed>(ApiFeed.defaultValue);

    const addNewFeed = async function () {
        setIsModalVisible(false);
        setFeed(ApiFeed.defaultValue);

        onAddNewFeed(feed);
    }

    const tagList = [];
    for (let i = 10; i < 36; i++) {
        tagList.push(<Option
            key={i.toString(36) + i}
            value={tagIdPrefix + (i + 5)}
        >{i.toString(36) + i}</Option>);
    }

    return (
        <Modal
            title="Adding feed"
            okText="Add"
            visible={isModalVisible}
            onOk={addNewFeed}
            onCancel={() => {
                setFeed(ApiFeed.defaultValue);
                setIsModalVisible(false);
            }}
        >
            <Space direction="vertical" style={{width: '100%'}}>
                <Input
                    value={feed.url}
                    onChange={e => setFeed({...feed, url: e.target.value})}
                    type="text" placeholder="URL"
                />
                <Input
                    value={feed.title}
                    onChange={e => setFeed({...feed, title: e.target.value})}
                    type="text" placeholder="Title"
                />
                <Select  style={{width: '100%'}} mode="tags" placeholder="Tags" onChange={(valueList:string[]) => {
                    const tags = [];

                    for (let i = 0; i < valueList.length; i++) {
                        const value = valueList[i];

                        if (value.match(tagIdPrefixRegExp)) {
                            tags.push({
                                id: parseInt(value.replace(tagIdPrefix, '')),
                                title: value,
                            });
                        } else {
                            tags.push({
                                title: value,
                            });
                        }
                    }

                    setFeed({...feed, tags});
                }}>
                    {tagList}
                </Select>
            </Space>
        </Modal>
    );
};

export default FeedAddForm;
