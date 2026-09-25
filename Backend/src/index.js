import dotenv from "dotenv";
import connectDB from "./config/database.js"; // Assuming .js extension based on your setup

dotenv.config({
    path: './.env'
});

const startServer = async () => {
    try {
        await connectDB();

        // FIX 1: Capture the server instance returned by app.listen()
        const server = app.listen(process.env.PORT || 8000, () => {
            // FIX 2: Use the fallback port in the log message, and keep it on one line
            console.log(`Server is running on port: ${process.env.PORT || 8000}`);
        });

        // FIX 3: Attach the error listener to the server instance, not the Express app
        server.on("error", (error) => {
            console.error("SERVER ERROR:", error);
            // FIX 4: Use process.exit instead of throw inside an event listener
            process.exit(1); 
        });

    } catch (error) {
        // FIX 5: Log the actual error and exit the process
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};

// Don't forget to call the function!
startServer();