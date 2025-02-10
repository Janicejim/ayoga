import dotenv from "dotenv"
dotenv.config()

export const REACT_APP_API_SERVER = process.env.REACT_APP_API_SERVER || "https://ayoga.backend.bonbony.one"
export const REACT_APP_UPLOAD_IMAGE = process.env.REACT_APP_UPLOAD_IMAGE || "https://ayoga.image.bonbony.one"