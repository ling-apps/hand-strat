/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  models: {
     connection: 'mongodb'
  },

  GOOGLE: {
    CLIENT_ID: '211904269077-o58t3aekvtfptgjrin9g7fblkb9pmmba.apps.googleusercontent.com',
    CLIENT_SECRET: 'PxJMhvDftLB0WN6JNGIB8hsB',
    scope: ['https://www.googleapis.com/auth/plus.login','https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email']
  },

  TWITTER: {
    CLIENT_ID: 'WcDW8EIiWE9XLia0MT3nqw',
    CLIENT_SECRET: 'OQzV7AhPoHaPPbfk6J25sJEzWcEezq92MEXi05XQqvw',
    scope: ['email']
  },

  FACEBOOK: {
    APP_ID: '807988539232086',
    APP_SECRET: 'a5dc48a55b14e93333ec304a5b608ac7',
    scope: ['email']
  },

  LOCAL: {
    scope: null
  }
};
