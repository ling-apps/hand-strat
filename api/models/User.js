/**
* User.js
*
* @description :: User, represent a customer
* @docs        :: l
*/

module.exports = {

  attributes: {
    email: {
      type: 'string',
      unique: true,
      required: true
    },
    password: {
      type: 'string',
      required: false,
      minLength: 6
    },
    admin: 'boolean',
    combis: {
      collection: 'combi',
      via: 'user'
    }
  },

  beforeCreate: function(attrs, next) {
    var bcrypt = require('bcrypt');

    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(attrs.password, salt, function(err, hash) {
        if (err) return next(err);

        attrs.password = hash;
        next();
      });
    });

  }
};

