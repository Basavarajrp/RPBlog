// lib/mongodb.js
import { MongoClient } from 'mongodb'

export const MongoDBConnection = async () => {

  if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local')
  }
  
  const uri: string = process.env.MONGODB_URI
  let client: MongoClient
  let clientPromise
  
  if (process.env.NODE_ENV === 'development') {
  
    const globalWithMongoClientPromise = global as typeof globalThis & {
      _mongoClientPromise: Promise<MongoClient>;
    };
  
    if (!globalWithMongoClientPromise._mongoClientPromise) {
      client = new MongoClient(uri)
      globalWithMongoClientPromise._mongoClientPromise = client.connect()
    }
    return await globalWithMongoClientPromise._mongoClientPromise
  } else {
    client = new MongoClient(uri)
    return await client.connect()
  }
  
}