import dotenv from "dotenv";

dotenv.config();

export const config = {
    db: {
        URI: process.env.DB_URI
    },
    server: {
        PORT: process.env.PORT
    },
    JWT: {
        secret: process.env.JWT_SECRET,
        expires: process.env.JWT_EXPIRES
    },
    admin: {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        profilePicture: process.env.ADMIN_PROFILE_PICTURE,
        birthdate: process.env.ADMIN_BIRTHDATE,
        address: process.env.ADMIN_ADDRESS,
        dui: process.env.ADMIN_DUI,
        phone: process.env.ADMIN_PHONE
    },
    emailUser: {
        user_email: process.env.USER_EMAIL,
        user_pass: process.env.USER_PASS
    },
    cloudinary: {
        cloud_name: process.env.CLOUD_NAME,
        cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
        cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET
    },
    wompi: {
        app_id_wompi: process.env.APP_ID_WOMPI,
        api_secret_wompi: process.env.API_SECRET_WOMPI,
        access_token_wompi: process.env.ACCESS_TOKEN_WOMPI
    }
};