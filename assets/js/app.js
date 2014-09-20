/* Hand Strat app */
var Combis = require('./Combis');

// --- Tools
function htmlEncode(s) {
  return s.replace(/&(?!\w+([;\s]|$))/g, "&amp;")
    .replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

$(document).ready(function() {

  // --- Event Listener
  $('#app-wrapper').on('click', '#add-combi-btn', handleAddCombiClick);
  $('#app-wrapper').on('submit', '#add-combi-form', handleAddCombiSubmit);

  // --- View

  // --- Event Handler
  function handleAddCombiClick(e) {
    e.preventDefault();
    $('#add-combi-form-wrapper').removeClass('hidden');
  }

  function handleAddCombiSubmit(e) {
    e.preventDefault();
    var input = $(this).find('input[type="text"]');
    Combis.createCombi(htmlEncode(input.val()));
    input.val('');
    $('#add-combi-form-wrapper').addClass('hidden');
  }

});
