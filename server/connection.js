import mongoose from "mongoose";

async function connect(url){
    await mongoose.connect(url);
}

export default connect;