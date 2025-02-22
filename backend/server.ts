import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
const API_VERSION = "/api";
import { routes } from "./routes";

app.use(API_VERSION, routes);
app.use(express.static("model"));

/* local use:
 app.use(express.static("uploads"));
 app.use(express.static("image"));
 app.use(express.static("poses"));
 */

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});
