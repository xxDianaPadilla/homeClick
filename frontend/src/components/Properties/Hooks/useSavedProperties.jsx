import { useState } from "react";

export const useSavedProperties = () => {

    const [isSaved, setIsSaved] = useState(false);

    const toggleSaved = () => {
        setIsSaved(!isSaved);
    };

    return {
        isSaved,
        toggleSaved
    };
};