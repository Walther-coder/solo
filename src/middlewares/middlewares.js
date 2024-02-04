 const checkUser = (req, res, next) => {
   if (req.session.login) {
     next();
  } else {
     res.redirect('/login');
  }
 };

const secureRoute = (req, res, next) => {
   if (!req.session.login) {
     next();
   } else {
    res.redirect('/error');
   }
 };

 module.exports = { checkUser, secureRoute };