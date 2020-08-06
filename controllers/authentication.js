import userModel from '../models/user.js';
import jwt from 'jwt-simple';
import {jwtKey} from '../config.js';

function tokenForUser (user){
  const timestamp = new Date().getTime();  
 return jwt.encode({sub:user.id,iat:timestamp },jwtKey.secret);
}

export  function signup (req,res,next){
      const email = req.body.email;
      const password = req.body.password;

      //check the email and password feilds are not empty
      if (!email || !password)
      {
        return res.status(422).send({error:'You must provide email and password'});
      }
      //search DB for provider user email 
      userModel.findOne({email: email},function (err,existingUser){
        if (existingUser){
          return res.status(422).send({error:'Email already assigned to an existing user account'});
        }
      });

      //if  a new email create a new user 
           const user = new userModel({
            email:email, password:password
          })
     //save to DB and check for err on saving
          user.save(err=> {if (err) return next(err)});
    //send back response with the new created user

    res.json({token:tokenForUser(user)});
          }

    export  function signin (req,res,next){
    res.json({token: tokenForUser(req.user)});
    }