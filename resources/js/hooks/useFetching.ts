import {useState} from "react";

type useFetchingReturn = [
    () => void,
    boolean,
    string
];

export const useFetching = (callback: () => void): useFetchingReturn => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const fetching = async () => {
        try {
            setIsLoading(true)
            await callback()
        } catch (e: any) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, error];
}
