import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: "string",
    
  },
  email: {
    type: "string",
   
  },
  mobileno:{
    type:"string",

  },
  password: {
    type: "string",

  },
});

const User = mongoose.model("User", userSchema);
export default User;
