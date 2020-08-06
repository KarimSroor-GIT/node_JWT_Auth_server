import passport from 'passport';
import userModel from '../models/user.js';
import {jwtKey} from '../config.js';
import passportJwt from 'passport-jwt';
import LocalStrategy from 'passport-local';

const ExtractJwt = passportJwt.ExtractJwt; 
const jwtStrategy = passportJwt.Strategy;

// configure options object of jwt strategy 

const jwtOptions = {
  jwtFromRequest :ExtractJwt.fromHeader('authorization'),
  secretOrKey : jwtKey.secret
};

const localOptions = {usernameField : 'email'};

//use the options object to create a new strategy
const jwtLogin = new jwtStrategy(jwtOptions,(payload,done)=>{
//check user id on payload(token)  exist in DB 
userModel.findById(payload.sub, (err, user)=>{
// if invalid id call done and return error
if (err) {return done(err,false)};  

//if valid id call done with user 
if (user)
{
  done(null,user);
}else{
  done(null,false);
}

});

});

//use the options object to create a new strategy
const localLogin = new LocalStrategy(localOptions,(email,password,done)=>{
  
  userModel.findOne({email:email},(err,user)=>{
    if(err) return done(err);
    if(!user) return done(null,false);

    user.comparePassword(password,(err,isMatch)=>{
      if (err) return done(err);
      if (!isMatch) return done(null,false);

      if (isMatch) return  done(null,user);
    });
  });
});



//pass over the created stategy to passport 
export const passportService=passport.use(jwtLogin);
export const passportlocalService= passport.use(localLogin);
