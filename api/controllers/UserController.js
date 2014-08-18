var passport = require('passport');
/** * UserController *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

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

  profile: function(req, res) {
    res.view('user/profile', {user: req.user});
  }

};

