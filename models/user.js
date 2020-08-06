import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
const Schema = mongoose.Schema;

// Define model 
const userSchema = new Schema({
  email: {type:String, unique:true, lowercase:true},
  password :{type:String}
});

userSchema.pre('save',function(next){
    const user = this;
    //generate a salt then run callback
    bcrypt.genSalt(10,function(err,salt){
      if (err) {return next(err);}
    // hash(encrypt) password using the generated salt  
    bcrypt.hash(user.password,salt,null,function(err,hash){
      if (err) {return next(err);}
      //use the hashed value as password
      user.password = hash;
      next();
    });

    });
});

userSchema.methods.comparePassword = function(submittedPassword, callback){
bcrypt.compare(submittedPassword, this.password,(err,isMatch)=>{
  if (err) return callback(err)
  else
  callback(null,isMatch)
});

};
// Define the model Class
const userModel = mongoose.model('user',userSchema);

//Export the model
export default userModel;
