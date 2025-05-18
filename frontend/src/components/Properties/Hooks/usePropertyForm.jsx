import { useState } from "react";

export const usePropertyForm = (initialData = {}) => {
    
    const [formData, setFormData] = useState({
    bedrooms: "",
    bathrooms: "",
    parking: "",
    patio: "",
    floors: "",
    constructionYear: "",
    location: "",
    address: "",
    floorType: "",
    lotSize: "",
    height: "",
    description: "",
    price: "",
    ...initialData
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return {
    formData,
    setFormData,
    handleChange
  };
};