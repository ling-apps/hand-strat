/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
function login(req, user) {
  req.session.user = user.id;
  req.session.authenticated = true;
  req.session.isAdmin = user.admin;
}

function logout(req) {
  req.session.user = null;
  req.session.authenticated = false;
  req.session.isAdmin = false;
}

module.exports = {

  find: function(req, res) {
    var query = null;
    if (req.params.id) {
      query = User.findOneById(req.params.id);
    } else {
      query = User.find();
    }

    query.exec(function(err, result) {
      if (err) res.json({error: 'DB Error'}, 500);

      res.json(result);
    });
  },

  login: function(req, res) {
    var bcrypt = require('bcrypt');

    User.findOneByEmail(req.body.email, function(err, user) {
      if (err) res.json({error: 'DB Error'}, 500);

      if (user) {
        bcrypt.compare(req.body.password, user.password, function(err, match) {
          if (match) {
            // Authenticated
            login(req, user);
            res.json(user);
          } else {
            logout(req);
            res.json({error: 'Le nom d\'utilisateur et le mot de passe ne correspondent pas !'}, 400);
          }
        });
      } else {
        res.json({error: 'Le nom d\'utilisateur et le mot de passe ne correspondent pas !'}, 400);
      }
    });
  },

  logout: function(req, res) {
    logout(req);
    req.flash('success', 'Vous avez ete deconnecte !');
    res.redirect('/');
  },

  register: function(req, res) {
    var err = {};
    if (!req.params.password) {
      err.password = "Vous devez saisir un mot de passe, il vous servira a vous connecter a l'application"
    }
    if (!req.params.email) {
      err.email = "Vous devez saisir un e-mail, il vous servira pour vous connecter a l'application"
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
        login(req, user);
        req.flash('success', 'Votre compte a bien ete cree');
        res.redirect('/account');
      }
    });
  },

  profile: function(req, res) {
    if (req.session.user) {
      User.findOneById(req.session.user).exec(function(err, user) {
        res.view('user/profile', {user: user});
      });
    }
  }

};

