import mongoose from "mongoose";

const url =
  process.env.MONGO_URL || "mongodb://localhost:27017/your_database_name";

interface DbClient {
  connection: typeof mongoose;
}

const connectToDb = async (): Promise<DbClient> => {
  try {
    const connection = await mongoose.connect(url);

    console.log("Connected to database");

    return { connection };
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process on connection error
  }
};

export default connectToDb;
