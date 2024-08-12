import mongoose, { Mongoose } from "mongoose";

const Mongo_URL = process.env.MONGO_DB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose

if(!cached){
    cached = (global as any).mongoose = {
        conn: null, promise: null
    }
}

export const connectToDB = async () => {
    if (cached.conn) {
      console.log("Using existing MongoDB connection");
      return cached.conn;
    }
  
    if (!Mongo_URL) {
      throw new Error('Missing MongoDB URL');
    }
  
    if (!cached.promise) {
      cached.promise = mongoose.connect(Mongo_URL, {
        dbName: 'imaginify',
        bufferCommands: false,
      }).then((mongoose) => {
        console.log("MongoDB connection established successfully");
        return mongoose;
      });
    }
  
    cached.conn = await cached.promise;
    return cached.conn;
  };
