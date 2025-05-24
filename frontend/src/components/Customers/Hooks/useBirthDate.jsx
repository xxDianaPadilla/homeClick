import React from "react";

const useBirthDate = () => {
    const [selectedDate, setSelectedDate, resetBirthDate] = React.useState({
        day: "",
        month: "",
        year: ""
    });

    return {selectedDate, setSelectedDate, resetBirthDate};
};

export default useBirthDate;