import React from "react";

const useTermsModal = () => {
    const [showModal, setShowModal] = React.useState(false);

    const handleModalOpen = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        document.getElementById('terms').checked = true;
    };

    return {showModal, handleModalOpen, handleModalClose};
};

export default useTermsModal;