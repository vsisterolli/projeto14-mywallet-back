import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config()

const mongoClient = new MongoClient(process.env.MONGO_URI)
try {
    await mongoClient.connect()
    console.log("Succesfully connected to database")
}
catch {
    console.log("Error connecting to database")
}

const db = mongoClient.db("myWallet")
export const usersCollection = db.collection("users");
export const sessionsCollection = db.collection("sessions")
