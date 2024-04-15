const mongoose =  require('mongoose')
require("dotenv").config();

const connectDB = async() => {
    try{
        console.log(process.env.MONGO_URI);
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${connection}`);
    }
    catch(error:any){
        console.error(`Error: ${error.message}`);
        process.exit();
    }
}

export default connectDB();