import mongoose from "mongoose";

const key = "e9Z4ae7EcHPxJb7e";
const URI = `mongodb+srv://101366:${key}@cluster0.lnxzyhi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const databaseConnection = async () => {
    if (!global.mongoose) {
        mongoose.set("strictQuery", false)
        global.mongoose = await mongoose.connect(URI)
        .then(()=>console.log('connected to mongodb'))
        .catch(e=>console.log(e));
    }
}

export default databaseConnection