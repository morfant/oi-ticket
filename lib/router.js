Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return Meteor.subscribe('posts');
  }
});


// Main page - for customer
Router.route('/', {
  name: 'playsList',
  data: function() { return Posts.find({}) } 
});


Router.route('/result/:event_id', {
  name: 'reserveResult',
  data: function() { return Events.findOne(this.params._id); }

});

// Router.route('/ticket/:_id', {
//     name: 'reserveTicket',
//     data: function() { return Posts.findOne(this.params._id); }
// });

// Router.route('/ticket/:_id/cancel',{
//     name: 'cancelTicket',
//     data: function() { return Posts.findOne(this.params._id); }
// });


//------------ADMIN------------

Router.route('/admin', {
    name: 'adminSetup'
});

Router.route('/admin/list', {
    name: 'postsList'
});

Router.route('/admin/submit', {
    name: 'postSubmit'
});

Router.route('/admin/post/:_id', {
    name: 'postPage',
    data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/admin/post/:_id/edit', {
    name: 'postEdit',
    data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/admin/guestCheck', {
    name: 'guestCheck'
});

Router.route('/admin/statistic', {
    name: 'statistic'
});

Router.route('/admin/settings', {
    name: 'settings'
});




var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
        this.render(this.loadingTemplate);
    } else {
        this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});


// onStop hook is executed whenever we LEAVE a route
Router.onStop(function(){
  // register the previous route location in a session variable
  Session.set("previousLocationPath", this.originalUrl || this.url);
  console.log(Session.get('previousLocationPath'));
});

