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
  find: function(req, res) {},

  create: function(req, res) {
    Combi.create({
      name: req.body.name,
      user: req.user
    }).exec(function(err, combi) {
      if (err) {
        res.json({error: err}, 500);
        return;
      }

      res.json(combi);
    });
  },

  update: function(req, res) {},

  destroy: function(req, res) {}
};

