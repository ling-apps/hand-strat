/**
*
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var passport = require('passport');

module.exports = {
  index: function (req, res) {
    res.view();
  },

  logout: function (req, res) {
    req.logout();
    res.redirect('/');
  },

  register: function(req, res) {
    var err = {};
    if (!req.params.password) {
      err.password = "Vous devez saisir un mot de passe, il vous servira a vous connecter a l'application";
    }
    if (!req.params.email) {
      err.email = "Vous devez saisir un e-mail, il vous servira pour vous connecter a l'application";
    }

    var admin = req.body.email === 'b2l.powa@gmail.com';
    User.create({
      email: req.body.email,
      password: req.body.password,
      admin: admin
    }).exec(function(err, user) {
      if (err) {
        req.flash('error', 'Error');
        res.view('user/register', err);
      } else {
        req.logIn(user, function(err) {
          if (err) {
            req.flah('error', err);
            res.redirect('/register');
          }
          req.flash('success', 'Votre compte a bien ete cree');
          res.redirect('/account');
        });
      }
    });
  },

  auth: function(req, res) {
    var provider = req.params.provider;
    var scope = sails.config[provider.toUpperCase()].scope;
    passport.authenticate(req.params.provider, {failureRedirect: '/login', scope: scope}, function(err, user) {
      req.logIn(user, function (err) {
          if (err) {
            console.log(err);
            res.view('500');
            return;
          }
          res.redirect('/');
          return;
        });
    })(req, res);
  }

};
