import React from 'react';
import {useIsFetching} from "react-query";

const GlobalFetchingIndicator: React.FC = () => {
    const isFetching = useIsFetching();

    return isFetching ? (
        <div>Loading...</div>
    ) : null
};

export default GlobalFetchingIndicator;