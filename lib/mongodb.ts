import mongoose from 'mongoose';

// 1. Get the URI from your .env file
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://SiddhiBhoite:Siddhi2003@cluster0.nbnwzkr.mongodb.net/jisnudb?retryWrites=true&w=majority';

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env'
  );
}


/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // If a connection exists, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If no connection promise exists, create a new one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("✅ MongoDB Connected Successfully");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
