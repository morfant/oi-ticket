// reserveConfirm = false;

Template.reserveResult.created = function(){
  // reserveConfirm = true;
}



Template.reserveResult.events({

  'click .back': function(e) {
    e.preventDefault();
    // console.log("back button clicked!");
  	Router.go('playsList');

  },

});
