Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [Meteor.subscribe('posts'), Meteor.subscribe('events'), Meteor.subscribe('settings')]
    // return [ Meteor.subscribe('events'), Meteor.subscribe('settings')]
  }
});


// Main page - for customer
Router.route('/', {
  name: 'playsList',
  data: function() { return Posts.find({state: POST_STATE_CUR}) }
});


Router.route('/result/:event_id', {
  name: 'reserveResult',
  data: function() { return Events.findOne(this.params._id); }

});

Router.route('/reserveCancel', {
  name: 'reserveCancel',
  // data: function() { return Events.find({}) }

});

//------------ADMIN------------

Router.route('/admin', {
    name: 'adminSetup',
    data: function() { return Posts.find({}) }
});

Router.route('/admin/list', {
    name: 'postsList',
    data: function() { return Posts.find({}) }
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
    name: 'statistic',
    data: function() { return Posts.find({state: POST_STATE_FIN}) }
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

var waitForDelete = function() {
  if (Session.get('needToLoading')) {
    this.render(this.loadingTemplate);
  } else {
    this.next();
  }
}



Router.onBeforeAction('dataNotFound', {only: 'postPage'});
// Router.onBeforeAction(requireLogin, {only: ['postSubmit', 'postsList', 'postPage', 'postEdit', 'guestCheck', 'statistic', 'settings' ]});
Router.onBeforeAction(requireLogin, {except: ['playsList', 'reserveResult', 'reserveCancel']});
Router.onBeforeAction(waitForDelete, {only: 'postsList'});


// onStop hook is executed whenever we LEAVE a route
Router.onStop(function(){
  // register the previous route location in a session variable
  Session.set("previousLocationPath", this.originalUrl || this.url);
  console.log(Session.get('previousLocationPath'));
});
