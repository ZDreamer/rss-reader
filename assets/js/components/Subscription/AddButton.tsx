import React, {useState} from 'react';
import ApiSubscription, {ISubscription} from "../../api/ApiSubscription";
import {Button, Modal} from "antd";
import AddForm from "./AddForm";

const SubscriptionAddButton: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const onAddNewSubscription = async function (subscription: ISubscription) {
        await ApiSubscription.save(subscription);

        console.log('added');
    };

    return (
        <div>
            <Button onClick={(e) => {
                e.preventDefault();

                setIsModalVisible(true);
            }}>Add subscription</Button>

            <AddForm
                onAddNewSubscription={onAddNewSubscription}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
            />
        </div>
    );
};

export default SubscriptionAddButton;
