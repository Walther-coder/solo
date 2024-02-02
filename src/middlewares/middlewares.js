 const checkUser = (req, res, next) => {
   if (req.session.login) {
     next();
  } else {
     res.redirect('/log');
  }
 };

const secureRoute = (req, res, next) => {
   if (!req.session.login) {
     next();
   } else {
    res.redirect('/main');
   }
 };

 module.exports = { checkUser, secureRoute };