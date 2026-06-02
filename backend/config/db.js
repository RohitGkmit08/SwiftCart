const mongoose = require("mongoose");

const connectDb = async () => {
    try{
        await mongoose.connect(process.env.URI);
        console.log("Database connected");

    }catch(error){
        console.log("Database connection failed : ", error)
        process.exit(1);
    }
}

module.exports = connectDb;

