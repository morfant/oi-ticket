elementDesc = {
  "place": "장소",
  "playDates": "공연시간",
  "price": "입장권",
  "duration": "소요시간",
  "contact": "문의",
  "ageGrade": "관람연령",
  "sponsor": "주최",
  "production": "제작",
  "director": "연출",
  "original": "작",
  "cast": "출연",
  "arrange": "각색",
  "description": "작품소개",
  "synopsis": "시놉시스",
  "staffs": "스태프",
};




Template.postItem.created = function(){
  postNum++; //used in post_list.js
  Session.set('isRendered', false);
  Session.set('sendingResult', {});
  Session.set('reserveStat', {0: false, 1: false, 2: false});
  Session.set('clickedPost', {});


}

var POST_HEIGHT = 80;
var Positions = new Meteor.Collection(null); // null means local collection




Template.postItem.helpers({
  // getImgId: function(ids) {
  //   console.log(ids);
  //   var imgs = Posts.findOne(this._id).includeImages;
  //   console.log(imgs);
  //   var id = imgs[0].split('_')[0];
  //   console.log(id);
  //   if (imgs) return imgs[0].split('_')[0];

  // },
  // getImage: function() {
  //   var imgs = Posts.findOne(this._id).includeImages;
  //   // var imgSrc = BASE_DIR + UPLOAD_DIR + imgs[idx];

  //   // var imgDiv = this.find('#_images');
  //   // var imgDiv = document.getElementById('_images');

  //   for (var i = 0; i < imgs.length; i++){
  //     // var img = document.createElement("img");
  //     // img.src = UPLOAD_DIR + imgFiles[i];
  //     // console.log("img1: " + img);
  //     // img.className = "sslideImages";
  //     // console.log("img2: " + img);
  //     // console.log(UPLOAD_DIR + imgFiles[i]);
  //     // imgDiv.appendChild(img);
  //   }

  //   // return "<img id=\"alskjdl\">";

  //   // imgSlide();

  //   // return imgSrc;
  // },
  addElement: function(element) {
    // console.log("addElement");
    // console.log(element);
    // console.log(elementDesc[element]);
    var infoText = document.getElementById('infomationText');
    var alist = document.createElement("LI");
    var title_p = document.createElement('p');
    var content_p = document.createElement('p');
    title_p.id = "tit";
    content_p.id = "con";
    title_p.innerHTML = elementDesc[element];
    // console.log(this); //a post
    // console.log(this[element]);
    content_p.innerHTML = this[element]; 
    alist.appendChild(title_p);
    alist.appendChild(content_p);
    infoText.appendChild(alist);

  },
  item: function() {
    return Posts.findOne();
  },
  isExistInDB: function(element) {
    // TODO: Implement
    return true;
  },
  isInPostsList: function() {
    if (Router.current().route.getName() == 'postsList') return true;
    else return false;
  },
  isInPost: function() {
    if (Router.current().route.getName() == 'postPage') return true;
    else return false;
  },  
  postId: function() {
    console.log("currentPostId: " + this._id);
    var p = Posts.findOne(this._id);
    console.log(p.includeImages);
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
  },
  getRendered: function () {
    return Session.get("isRendered");
  },
  getRevStat: function(idx) {
    var rslt = Session.get('reserveStat');
    console.log(rslt);
    return rslt[idx];
  },
  getClickedId: function(id){
    var clickedId = Session.get('clickedPost');
    // console.log("clickedId: " + clickedId);
    // console.log("arg id: " + id);
    if (clickedId === id) return true;
    else return false;
  }
});


Template.postItem.rendered = function(){
  Session.set("isRendered", true);
}


resetButtonValue = function(target, str, delay) {
  Meteor.setTimeout(
    function(){
      target.value = str;
      target.disabled = false;
    }, delay);
}

Template.postItem.events({
  'click .reserve': function(e) {
    e.preventDefault();
    console.log("reserve button clicked!");
    // console.log(e.target.className);
    //TODO: use regex instead.
    var postId = e.target.className.split(' ').reverse()[0];
    console.log(postId);
    Session.set('clickedPost', postId);
    // Session.set('reserveStat', {0: true, 1: false, 2: false});


  },
  'click .reserve_cancel': function(e) {
    e.preventDefault();
    console.log("cancel button clicked!");
    Session.set('reserveStat', {0: false, 1: false, 2: false});


  },
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






