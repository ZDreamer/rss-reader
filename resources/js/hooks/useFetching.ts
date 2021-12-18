import {useState} from "react";

type useFetchingReturn = [
    (...args: any[]) => void,
    boolean,
    string
];

export const useFetching = (callback: (...args: any[]) => void): useFetchingReturn => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const fetching = async (...args: any[]) => {
        try {
            setIsLoading(true)
            await callback(...args)
        } catch (e: any) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, error];
}
