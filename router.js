import  {signup} from './controllers/authentication.js';
import  {signin} from './controllers/authentication.js';
import passport from 'passport';
import {passportService} from './services/passport.js';
import {passportlocalService} from './services/passport.js';


function Router (app){

  const requireAuthentication = passport.authenticate('jwt',{session:false});
  const requireSignin = passport.authenticate('local',{session:false});

  app.get('/',requireAuthentication , function(req, res ){
    res.send('request is successfully authenticated');
});
  app.post('/signup',signup);
  app.post('/signin',requireSignin,signin);
}

export default Router;