import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/database.js";

dotenv.config({
    path: "./.env"
});

const startServer = async () => {
    try {
        await connectDB();

        const server = app.listen(
            process.env.PORT || 8000, () => {
                console.log(
                    `Server is running on port: ${process.env.PORT}`
                );
            }
        );

        server.on("error", (error) => {
            console.error("SERVER ERROR:", error);
            process.exit(1);
        });

    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};

startServer();