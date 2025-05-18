import React from "react";

const useEditProperty = () => {
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

    const openEditModal = () => {
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    return {isEditModalOpen, openEditModal, closeEditModal};
};

export default useEditProperty;