export const usePropertySubmit = (formData, images, onClose) => {
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Form data:", formData);
        console.log("Images:", images);
        onClose();
    };

    return {
        handleSubmit
    };
};