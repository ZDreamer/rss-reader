import React from 'react';
import ApiSubscription from "../../api/ApiSubscription";
import {useQuery} from "react-query";

const SubscriptionLayoutTree: React.FC = () => {
    const {data, isError, error} = useQuery('tree', ApiSubscription.getTree);

    if (data) {
        return (
            <div>
                {data.data['hydra:member'].map(item => (
                    <div key={item.id}>
                        {item.title}
                    </div>
                ))}
            </div>
        );
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return <span>Loading...</span>
};

export default SubscriptionLayoutTree;
