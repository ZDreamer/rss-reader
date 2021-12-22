import {useEffect, useReducer, useState} from "react";
import axios from "axios";

type useAjaxState = {
    isLoading: boolean,
    isError: boolean,
    data: unknown
};

type useAjaxAction = {
    type: 'FETCH_INIT' | 'FETCH_SUCCESS' | 'FETCH_FAILURE',
    payload?: unknown
};

const dataFetchReducer = (state: useAjaxState, action: useAjaxAction): useAjaxState => {
    switch (action.type) {
        case 'FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            };
        case 'FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        default:
            throw new Error();
    }
};

type useAjaxOptions = string;

const useAjax = (initialAjaxOptions: useAjaxOptions, initialData: useAjaxState) => {
    const [ajaxOptions, setAjaxOptions] = useState(initialAjaxOptions);

    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: false,
        isError: false,
        data: initialData,
    });

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            dispatch({ type: 'FETCH_INIT' });

            try {
                const result = await axios(ajaxOptions);

                if (!didCancel) {
                    dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
                }
            } catch (error) {
                if (!didCancel) {
                    dispatch({ type: 'FETCH_FAILURE' });
                }
            }
        };

        // noinspection JSIgnoredPromiseFromCall
        fetchData();

        return () => {
            didCancel = true;
        };
    }, [ajaxOptions]);

    return [state, setAjaxOptions];
};

export default useAjax;
