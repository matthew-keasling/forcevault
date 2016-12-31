var router = require('express').Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', passport.authenticate('login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

module.exports = router;