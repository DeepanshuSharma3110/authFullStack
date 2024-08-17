import userModel from "./userSchema.js";
class UserRepository {
  
    //add new user
    add = async (username, password, email, gender) => {
    try {
      const user = new userModel({
        username,
        password,
        email,
        gender,
      });
      const savedUser = await user.save();

      return {
        username: savedUser.username,
        email: savedUser.email,
        gender: savedUser.gender,
        id: savedUser._id,
      };
    } catch (err) {
        throw err;
    }
  };


findByEmail = async (email) => {
  try {
    console.log("Searching for email:", email);
    const result = await userModel.findOne({ email: email });

    if (result) {
      console.log('found by email',result);
      return result;
    } else {
      console.log('unable to found by email',result);
      return null;  
    }
  } catch (err) {
    console.error("Error finding email:", err);
    throw err;  
  }
}


 updateOtp = async (createResetKey, email) => {
  try {
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    const result = await userModel.findOneAndUpdate(
      { email: email },
      { randomKey: createResetKey, expiresAt: expiresAt },
      { new: true } 
    );

    if (result) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw err;
  }
};



changePassword = async(id,hashPassword)=>{
  try{
    
    const result = await userModel.findByIdAndUpdate({_id:id},{password:hashPassword},{new:true});
    if(result){
      return true;
    }else{
      return false;
    }
  }catch(err){

  }
}
}

export default UserRepository;
