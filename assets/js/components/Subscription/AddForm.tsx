import React, {useState} from 'react';
import ApiSubscription, {ISubscription} from "../../api/ApiSubscription";
import {Input, Modal, Space, Select} from 'antd';

export type SubscriptionAddFormType = React.FC<{
    isModalVisible: boolean,
    setIsModalVisible: (isModalVisible: boolean) => void,
    onAddNewSubscription: (subscription: ISubscription) => void
}>

const {Option} = Select;
const tagIdPrefix = 'SubscriptionAddFormTagIdPrefix_';
const tagIdPrefixRegExp = /SubscriptionAddFormTagIdPrefix_\d+/;

const SubscriptionAddForm: SubscriptionAddFormType = ({
    isModalVisible,
    setIsModalVisible,
    onAddNewSubscription
}) => {
    const [subscription, setSubscription] = useState<ISubscription>(ApiSubscription.defaultValue);

    const addNewSubscription = async function () {
        setIsModalVisible(false);
        setSubscription(ApiSubscription.defaultValue);

        onAddNewSubscription(subscription);
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
            title="Adding subscription"
            okText="Add"
            visible={isModalVisible}
            onOk={addNewSubscription}
            onCancel={() => {
                setSubscription(ApiSubscription.defaultValue);
                setIsModalVisible(false);
            }}
        >
            <Space direction="vertical" style={{width: '100%'}}>
                <Input
                    value={subscription.url}
                    onChange={e => setSubscription({...subscription, url: e.target.value})}
                    type="text" placeholder="URL"
                />
                <Input
                    value={subscription.title}
                    onChange={e => setSubscription({...subscription, title: e.target.value})}
                    type="text" placeholder="Title"
                />
                <Select  style={{width: '100%'}} mode="tags" placeholder="Tags" onChange={(valueList:string[]) => {
                    const tagsIds = [];
                    const newTagNames = [];

                    for (let i = 0; i < valueList.length; i++) {
                        const value = valueList[i];

                        if (value.match(tagIdPrefixRegExp)) {
                            tagsIds.push(parseInt(value.replace(tagIdPrefix, '')));
                        } else {
                            newTagNames.push(value);
                        }
                    }

                    setSubscription({...subscription, tagsIds, newTagNames});
                }}>
                    {tagList}
                </Select>
            </Space>
        </Modal>
    );
};

export default SubscriptionAddForm;
