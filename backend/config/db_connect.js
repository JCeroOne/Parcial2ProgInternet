import logger from "../util/logger.js";
export default async mongoose => {
    try {
        logger.log("Database", "Connecting...");
        await mongoose.connect(process.env.DB_URI);
        logger.log("Database", "Connection established succesfully!");
    } catch(e){
        logger.error(`An error occurred while connecting to the database!\n-----\n${e}`);
        process.exit(1);
    }
}