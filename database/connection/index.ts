import mongoose from "mongoose"
export const connectToDb = async() => {
    const DB_URL = process.env.DB_URL;
    if(!DB_URL) throw new Error('Mongo db Url is required')
    try {
         await mongoose.connect(DB_URL, {
            dbName: "bmjr"
         })
         console.log("mongo db has been connected successfuly")
    } catch (error) {
         console.log(error, "error connecting to mongodb database")
    }
}