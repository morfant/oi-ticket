Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return Meteor.subscribe('posts');
  }
});

Router.route('/', {
  name: 'postsList' //plays list, 예약 가능한 공연 정보를 나열하는 main 페이지
 
});

Router.route('/ticket/:_id', {
    name: 'reserveTicket',
    data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/ticket/:_id/cancel',{
    name: 'cancelTicket',
    data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/postSubmit', {
    name: 'postSubmit'
});

Router.route('/posts/:_id/edit',{
    name: 'postEdit',
    data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/settings', {
    name: 'settings'
});

Router.route('/adminSetup', {
    name: 'adminSetup'
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


