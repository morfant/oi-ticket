Template.postItemSimple.created = function(){

}

var POST_HEIGHT = 80;
var Positions = new Meteor.Collection(null); // null means local collection




Template.postItemSimple.helpers({
  ownPost: function() {
      return this.userId === Meteor.userId();
  },

});


Template.postItemSimple.rendered = function(){
}


Template.postItemSimple.events({
  // 'click .discuss': function(e) {
  //   e.preventDefault();
  //   console.log("discuss button clicked!");
  //   // console.log(e.target.className);
  //   var postId = e.target.className.split(' ').reverse()[0];
  //   console.log(postId);
  //   // Session.set('reserveStat', {0: true, 1: false, 2: false});
  // },

});






