
Template.adminSetup.helpers({


});


Template.adminSetup.rendered = function(){

  Tracker.autorun( function() {
    Posts.find().fetch();

    Meteor.call('fbRescrape', function(error, result){
      if (error)
        return throwError(error.reason);
    });
  });



}
