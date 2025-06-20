import { useState, useEffect } from "react";
import { useSavedProperties as useSavedPropertiesContext } from '../../../context/SavedPropertiesContext';

export const useSavedProperties = (propertyId = null) => {
    const { isPropertySaved, toggleProperty } = useSavedPropertiesContext();
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (propertyId) {
            setIsSaved(isPropertySaved(propertyId));
        }
    }, [propertyId, isPropertySaved]);

    const toggleSaved = (property) => {
        const newSavedState = toggleProperty(property);
        setIsSaved(newSavedState);
        return newSavedState;
    };

    return {
        isSaved,
        toggleSaved,
        isPropertySaved: (id) => isPropertySaved(id)
    };
};