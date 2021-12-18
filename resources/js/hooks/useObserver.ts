import {MutableRefObject, useEffect, useRef} from "react";

const useObserver = function<Type extends Element>(
    anchorRef: MutableRefObject<Type | null>,
    isLoading: boolean,
    canLoad:  boolean,
    callback:  () => void
): void {
    const anchorObserver = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (isLoading) return;

        if (anchorObserver.current) {
            anchorObserver.current.disconnect();
        }

        anchorObserver.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && canLoad) {
                callback();
            }
        }, {
            rootMargin: '50px',
        });

        anchorRef.current && anchorObserver.current.observe(anchorRef.current);
    }, [isLoading]);
}

export default  useObserver;
