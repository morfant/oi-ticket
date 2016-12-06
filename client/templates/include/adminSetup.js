Template.adminSetup.created = function() {
  Session.set('isSettingInserted', false);
};


Template.adminSetup.helpers({
  isSettingInserted: function () {
    return Session.get('isSettingInserted');
  },


});


Template.adminSetup.rendered = function(){

  Tracker.autorun( function() {
    Posts.find().fetch();

    // Meteor.call('fbRescrape', function(error, result){
    //   if (error)
    //     return throwError(error.reason);
    // });
  });

  if (Settings.find().count() === 0) {
    Session.set('isSettingInserted', false);
  } else {
    Session.set('isSettingInserted', true);
  }



}
