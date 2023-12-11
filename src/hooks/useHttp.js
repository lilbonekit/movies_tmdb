// useHttp.js
import { useState, useCallback } from 'react';

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        

    try {
        setIsLoading(true)
        setError(null)
        const response = await fetch(url, {
            method,
            body: body ? JSON.stringify(body) : null,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        })

        if (!response.ok) {
            throw new Error('Что-то пошло не так!')
        }

        const data = await response.json()
        setIsLoading(false)

        return data

    } catch (err) {
        setError(err.message || 'Что-то пошло не так!');
        setIsLoading(false);
        // throw err
    }
    }, []);

    const clearError = useCallback(() => {
        setError(null)
        setIsLoading(false)
    }, [])

    return {
        isLoading,
        setIsLoading,
        error,
        setError,
        request,
        clearError
    };
};

export default useHttp
