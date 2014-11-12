var bcrypt = require('bcrypt');
/**
* User.js
*
* @description :: User, represent a customer
* @docs        :: l
*/

module.exports = {

  attributes: {
    provider: 'STRING',
    uid: 'STRING',
    firstname: 'STRING',
    lastname: 'STRING',
    email: 'STRING',
    name: 'STRING',
    admin: 'BOOLEAN',
    password: 'STRING',
    combis: {
      collection: 'combi',
      via: 'owner'
    },

    validPassword: function(password) {
      return bcrypt.compareSync(password, this.password);
    }
  },

  toJSON: function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
  },

  beforeCreate: function(attrs, next) {
    if (undefined !== attrs.password) {

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

