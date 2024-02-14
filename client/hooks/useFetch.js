import {useState, useEffect} from 'react';

export function useFetch(url) {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        fetch(url)
    }, [url])
}