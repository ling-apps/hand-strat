/* Hand Strat
 * Entry point
 */

var React = require('react');

var App = require('./app');

var node = document.createElement('div');
document.querySelector('.content').appendChild(node);
React.renderComponent(App(), node);
