Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return Meteor.subscribe('posts');
  }
});


Router.route('/', {
  name: 'postsList',
  data: function() { return Posts.find({}) } 
});

Router.route('/ticket/:_id', {
    name: 'reserveTicket',
    data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/ticket/:_id/cancel',{
    name: 'cancelTicket',
    data: function() { return Posts.findOne(this.params._id); }
});



Router.route('/admin', {
    name: 'adminSetup'
});

Router.route('/admin/submit', {
    name: 'postSubmit'
});

Router.route('/admin/:_id/edit', {
    name: 'postEdit',
    data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/admin/playsList', {
    name: 'adminPlaysList'
});

Router.route('/admin/statistic', {
    name: 'adminGuestCheck'
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


