/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  login: function(req, res) {
    var bcrypt = require('bcrypt');

    User.findOneByEmail(req.body.email, function(err, user) {
      if (err) res.json({error: 'DB Error'}, 500);

      if (user) {
        bcrypt.compare(req.body.password, user.password, function(err, match) {
          if (match) {
            // Authenticated
            req.session.user = user.id;
            req.session.authenticated = true;
            res.json(user);
          } else {
            if (req.session.user) {
              req.session.user = null;
              req.session.authenticated = false;
              res.json({error: 'Le nom d\'utilisateur et le mot de passe ne correspondent pas !'}, 400);
            }
          }
        });
      } else {
        res.json({error: 'Le nom d\'utilisateur et le mot de passe ne correspondent pas !'}, 400);
      }
    });
  },

  logout: function(req, res) {
    req.session.user = null;
    req.session.authenticated = false;
    res.send('Vous avez bien ete deconnecte');
  },

  register: function(req, res) {
    res.view('user/register');
  }

};

