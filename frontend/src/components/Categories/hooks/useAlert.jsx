import React, {useState} from "react";

const useAlert = () => {
  const [alert, setAlert] = useState({
    isVisible: false,
    message: ''
  });

  const showAlert = (message) => {
    setAlert({
      isVisible: true,
      message
    });
  };

  const hideAlert = () => {
    setAlert({
      isVisible: false,
      message: ''
    });
  };

  return {
    alert,
    showAlert,
    hideAlert
  };
};

export default useAlert;