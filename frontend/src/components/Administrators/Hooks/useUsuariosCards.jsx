import React, {useRef, useEffect, useState} from "react";

const useUsuarios = () => {

    const [usuarios, setUsuarios] = useState([
        {id: 1, nombre: "Rolando Perez, Juan Emilio", email: "juanemilio@gmail.com"},
        {id: 2, nombre: "Esposito Galdamez, Joana Alexandra", email: "joanaesposito@gmail.com"},
        {id: 3, nombre: "Rolando Perez, Juan Emilio", email: "juanemilio@gmail.com"},
        {id: 4, nombre: "Esposito Galdamez, Joana Alexandra", email: "joanaesposito@gmail.com"},
        {id: 5, nombre: "Rolando Perez, Juan Emilio", email: "juanemilio@gmail.com"},
        {id: 6, nombre: "Esposito Galdamez, Joana Alexandra", email: "joanaesposito@gmail.com"},
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