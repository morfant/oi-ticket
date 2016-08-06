Template.postItem.created = function(){
  Session.set('sendingResult', {});
}

var POST_HEIGHT = 80;
var Positions = new Meteor.Collection(null); // null means local collection

Template.postItem.helpers({
  isInPostsList: function() {
    if (Router.current().route.getName() == 'postsList') return true;
    else return false;
  },
  isInPost: function() {
    if (Router.current().route.getName() == 'postPage') return true;
    else return false;
  },  
  postId: function() {
    return this._id;
  },
  getImg: function() {
    console.log('.uploads/' + this.imgId);
    return '.uploads/' + this.imgId
  },
  ownPost: function() {
      return this.userId === Meteor.userId();
  },
  upvotedClass: function () {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
        return 'btn-primary upvotable';
    } else {
        return 'disabled';
    }
  },
  attributes: function() {
    var post = _.extend({}, Positions.findOne({postId: this._id}), this);
    var newPosition = post._rank * POST_HEIGHT;
    var attributes = {};

    if (_.isUndefined(post.position)) {
      attributes.class = 'post invisible';
    } else {
      var delta = post.position - newPosition;      
      attributes.style = "top: " + delta + "px";
      if (delta === 0)
        attributes.class = "post animate"
    }

    Meteor.setTimeout(function() {
      Positions.upsert({postId: post._id}, {$set: {position: newPosition}})
    });
    return attributes;
  },
  sendingResult: function () {
    return Session.get('sendingResult');
  }
});


resetButtonValue = function(target, str, delay) {
  Meteor.setTimeout(
    function(){
      target.value = str;
      target.disabled = false;
    }, delay);
}

Template.postItem.events({
    'click #mailing': function(e) {
        e.preventDefault();
        console.log("mailing button clicked");

        var originalValue = e.target.value;
        e.target.disabled = true;
        e.target.value = "sending...";

        var subject = this.title;
        var text = this.text;
        console.log(text);

        Meteor.call('createCampaign', subject, function (error, result) {
          if (error) { 
            Session.set('sendingResult', {error: error});
            e.target.value = "createCampaign Failed.";
            resetButtonValue(e.target, originalValue, 1000);
          } else {
            // console.log(result);
            var campaignId = result.id;
            // console.log(campaignId);
            Session.set('sendingResult', campaignId);
            e.target.value = "createCampaign succeed..";

            Meteor.call ('editContent', campaignId, text, function(error, result) {
              if (error) {
                Session.set('sendingResult', {error: error});
                e.target.value = "editContent Failed.";
                resetButtonValue(e.target, originalValue, 1000);
              }else{
                // console.log(result);
                Session.set('sendingResult', result);
                e.target.value = "editContent succeed..";

                // console.log("campaignId: " + campaignId);
                Meteor.call('sendMail', campaignId, function(error, result){
                  if (error) {
                    Session.set('sendingResult', error);
                    e.target.value = "sending Failed.";
                    resetButtonValue(e.target, originalValue, 1000);
                  } else {
                    Session.set('sendingResult', result);
                    e.target.value = "Sending succeed!!";
                    resetButtonValue(e.target, originalValue, 1000);

                  }
                })
              }
            }) 
          }
        });
    }

});






