import React, {useRef, useEffect, useState} from "react";

const useUsuarios = () => {

    const [usuarios, setUsuarios] = useState([
        {id: 1, nombreCasa: "Casa en la Colonia Escalón", estado: "pagado"},
        {id: 2, nombreCasa: "Casa en la Colonia Escalón", estado: "pagado"},
        {id: 3, nombreCasa: "Casa en la Colonia Escalón", estado: "pagado"},
        {id: 4, nombreCasa: "Casa en la Colonia Escalón", estado: "pagado"},
        {id: 5, nombreCasa: "Casa en la Colonia Escalón", estado: "pagado"},
        {id: 5, nombreCasa: "Casa en la Colonia Escalón", estado: "pagado"},
    ]);

    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleCardClick = (usuario) => {
        setSelectedUser(usuario);
        setShowEditModal(true);
    };

    const closeModal = () => {
        setShowEditModal(false);
    };

    return {
        showEditModal,
        selectedUser,
        handleCardClick,
        closeModal,
        usuarios
    };
}

export default useUsuarios;