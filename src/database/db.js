import { MongoClient } from "mongodb";

const mongoClient = new MongoClient("mongodb://localhost:27017")
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