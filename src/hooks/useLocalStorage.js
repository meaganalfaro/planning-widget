import { useState } from 'react';

export function useLocalStorage(key, initial){
    const [val, setVal] = useState(() => {
        try{
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : initial;
        } catch { return initial; }
    });

    const save = (newVal) => {
        setVal(newVal);
        localStorage.setItem(key, JSON.stringify(newVal));
    };

    return [val, save];

}