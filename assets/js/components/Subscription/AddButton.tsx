import React, {useState} from 'react';
import ApiSubscription, {ISubscription} from "../../api/ApiSubscription";
import {Button, Modal} from "antd";
import AddForm from "./AddForm";
import {useMutation, useQueryClient} from "react-query";

const SubscriptionAddButton: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const addNewSubscriptionMutation = useMutation((subscription: ISubscription) => {
        return ApiSubscription.save(subscription);
    }, {
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries('tree');
        }
    });

    const onAddNewSubscription = async function (subscription: ISubscription) {
        addNewSubscriptionMutation.mutate(subscription);
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
