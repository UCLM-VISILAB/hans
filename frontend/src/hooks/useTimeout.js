import { useEffect, useRef, useState } from "react";

export default function useTimeout(callback) {
    const callbackRef = useRef(callback);
    const [isPending, setPending] = useState(false);
    const timerId = useRef();

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => () => {
        cancel();
    }, []);

    function cancel() {
        clearTimeout(timerId.current);
        timerId.current = null;
    }

    function trigger(delay) {
        cancel();
        setPending(true);
        timerId.current = setTimeout(() => {
            setPending(false);
            callbackRef.current();
        }, delay);
    }

    return {
        trigger,
        cancel,
        isPending
    }
}