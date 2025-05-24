import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

/*
     Este es el modelo:

     Collection name: properties

     images: [
             {
                 image: {
                     type: String,
                     required: true,
                 },
             },
         ],
         description: {
             type: String, 
             require: true
         },
         location: {
             type: String,
             require: true
         },
         price: {
             type: String,
             require: true
         },
         floors: {
             type: Number,
             require: true
         },
         flooringType: {
             type: String,
             require: true
         },
         lotSize: {
             type: String,
             require: true
         },
         height: {
             type: String,
             require: true
         },
         constructionYear: {
             type: String,
             require: true
         },
         rooms: {
             type: Number,
             require: true
         },
         bathrooms: {
             type: Number, 
             require: true
         },
         parkingLot: {
             type: Boolean,
             require: true
         },
         patio: {
             type: Boolean,
             require: true
         },
         sellerId: {
             type: Schema.Types.ObjectId,
             ref: "Administrator",
             require: true
         },
         categoryId: {
             type: Schema.Types.ObjectId,
             ref: "Category",
             require: true
         }
 */

const useFetch = () => {
    const [activeTab, setActiveTab] = useState("properties");
    const API = "http://localhost:4000/api/properties";
    const [id, setId] = useState("");
    const [nambeProperty, setNameProperty] = useState("");
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProperties = async () => {
        if(!Response.ok){
            throw new Error("Error al obtener las propiedades");
        }

        const data = await Response.json();
        setProperties(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchProperties();
    }, []);

    
}