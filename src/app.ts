import dotenv from "dotenv";
dotenv.config();

import express, { json, urlencoded } from "express";

import { connectToDatabase } from "./db/connect";

// swagger UI
import * as swaggerUI from "swagger-ui-express";
import * as swaggerJson from "./tsoa/tsoa.json";
import { RegisterRoutes } from "./routes/routes";

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());


// serve Swagger UI
app.use(
    ["/openapi", "/docs", "/swagger"],
    swaggerUI.serve,
    swaggerUI.setup(swaggerJson)
);

// serve swagger JSON
app.get("/swagger.json", (_, res) => {
    res.setHeader("Content-Type", "application/json");
    res.sendFile(__dirname + "/tsoa/tsoa.json");
});

RegisterRoutes(app);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        const mongoUri = process.env.MONGO_URL;
        if (!mongoUri) {
            throw new Error("MONGO_URL is missing in .env file");
        }
        console.log("Connecting to database...");
        await connectToDatabase(mongoUri);
        console.log("Connected to database");
        console.log("Starting server...");
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (e) {
        console.log(e);
    }
};

start();