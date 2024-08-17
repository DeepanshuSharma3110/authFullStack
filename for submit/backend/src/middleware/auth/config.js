import mongoose from "mongoose";


const database = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log('connected to database');
    
  } catch (err) {
    console.log(err);
  }
};

export default database;