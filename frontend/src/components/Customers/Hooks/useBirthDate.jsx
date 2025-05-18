import React from "react";

const useBirthDate = () => {
    const [selectedDate, setSelectedDate] = React.useState({
        day: "",
        month: "",
        year: ""
    });

    return {selectedDate};
};

export default useBirthDate;