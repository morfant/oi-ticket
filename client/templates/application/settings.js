var settings = {};

Template.settings.created = function(){
  Session.set('settingsErrors', {});
}

loadSlideInterval = function() {
  var data = Settings.findOne();
  var slideInterval = data.slideInterval;
  return slideInterval;
}

Template.settings.helpers({
  errorMessage: function(field) {
    return Session.get('settingsErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('settingsErrors')[field] ? 'has-error' : '';
  },


})

Template.settings.rendered = function() {
  this.find('#settings_slideInterval').value = loadSlideInterval();
}

Template.settings.events({
  'submit form': function(e) {
    e.preventDefault();
    console.log("SETTINGS submit");

    var settings = {};
    var interval = Number(document.getElementById('settings_slideInterval').value);

    console.log(interval);

    // var errors = Session.get('settingsErrors');
    var errors = {};
    console.log(errors);
    errors.slideInterval = validateSlideInterval(interval);
    console.log(errors);
    if (errors.slideInterval)
      return Session.set('settingsErrors', errors);

    settings.slideInterval = interval;

    Meteor.call('saveSettings', settings, function(error, result) {
      console.log("Meteor call - saveSettings()");
      // display the error to the user and abort
      if (error) {
        console.log("ERROR!!");
        console.log(error.reason);
        return throwError(error.reason);
      }
      console.log("saveSettings() is succeeded.");
      Session.set('slideShowTime', interval);

    });
  },



});
