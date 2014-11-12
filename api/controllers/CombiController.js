/**
 * CombiController
 *
 * @description :: Server-side logic for managing combis
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  // --- Client action
  index: function(req, res) {
    Combi.find({user: req.user})
      .exec(function(err, combis) {
        res.view('combi/index', {combis: combis});
      });
  },

  // --- API
  find: function(req, res) {
    User.findOne(req.user.id).populate('combis')
      .exec(function(err, user) {
        if (err) {
          res.json({error: err}, 500);
        } else {
          res.json(user.combis);
        }
      });
  },

  create: function(req, res) {
    Combi.create({
      name: req.body.name,
      owner: req.user
    }).exec(function(err, combi) {
      if (err) {
        res.json({error: err}, 500);
        return;
      }

      res.json(combi);
    });
  },

  update: function(req, res) {
    Combi.findOne(req.params.id).exec(function(err, combi) {
      combi.name = req.body.name
      combi.save();
      res.send(200);
    });
  },

  destroy: function(req, res) {
    var id = req.params.id;
    Combi.destroy(id).exec(function(err) {
      if (err) return res.json({error: err}, 500);

      res.send(200);
    });
  }
};

