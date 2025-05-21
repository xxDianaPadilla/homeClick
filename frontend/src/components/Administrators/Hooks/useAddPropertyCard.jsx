import React from "react";

const useAddPropertyCard = () => {
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };

    return {isAddModalOpen, openAddModal, closeAddModal};
};

export default useAddPropertyCard;