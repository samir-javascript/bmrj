// import mongoose from "mongoose"
// let isConnected: boolean = false;

// const connectToDb = async(): Promise<void> => {
//     const MONGODB_URL = process.env.MONGODB_URL;
//      try {
//          if(isConnected) {
//              console.log('✅ using existing database connection')
//              return;
//          }
//          if(!MONGODB_URL) throw new Error('❌ MONGODB URL is not defined in the envirement viariables!')
//             const db = await mongoose.connect(MONGODB_URL, {
//                dbName: "soufiane_big_ecommerce_app"
//             }  as mongoose.ConnectOptions)
//             isConnected = db.connection.readyState === 1;
//             console.log('✅ MONGODB has been connected successfuly')
//      } catch (error) {
//          console.log(`❌ error occured while trying to connect to database , ${error}`)
//          process.exit(1)
//      }
// }
// export default connectToDb
// lib/dbConnect.js
// lib/dbConnect.ts
// lib/dbConnect.ts
import { coupon } from '@/actions/coupon.actions';
import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URL;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

interface CachedMongoose {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: CachedMongoose = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
 
  return cached.conn;
}

export default dbConnect;