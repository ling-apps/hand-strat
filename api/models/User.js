/**
* User.js
*
* @description :: User, represent a customer
* @docs        :: l
*/

module.exports = {

  attributes: {
    provider: 'string',
    uid: 'string',
    firstname: 'string',
    lastname: 'string',
    email: 'string',
    admin: 'boolean',
    password: 'string',
    combis: {
      collection: 'combi',
      via: 'user'
    }
  },

  toJSON: function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
  },

  beforeCreate: function(attrs, next) {
    if (undefined !== attrs.password) {
      var bcrypt = require('bcrypt');

      bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(attrs.password, salt, function(err, hash) {
          if (err) return next(err);

          attrs.password = hash;
          next();
        });
      });
    } else {
      next();
    }
  }
};

