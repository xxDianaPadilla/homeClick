import { useState } from "react";

export const useExpandableSections = () => {
    const [detailsExpanded, setDetailsExpanded] = useState(false);

    const [dimensionsExpanded, setDimensionsExpanded] = useState(false);

    const toggleDetails = () => {
        setDetailsExpanded(!detailsExpanded);
    };

    const toggleDimensions = () => {
        setDimensionsExpanded(!dimensionsExpanded);
    };

    return {
        detailsExpanded,
        dimensionsExpanded,
        toggleDetails,
        toggleDimensions
    };
};