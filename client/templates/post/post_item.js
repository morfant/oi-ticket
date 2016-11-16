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
  var curRouteName = Router.current().route.getName();
  if (curRouteName == 'playsList') {
    postNum++; //used in post_list.js
  }

  console.log("postNum in postItem.js: " + postNum);
  Session.set('isRendered', false);
  Session.set('sendingResult', {});
  Session.set('reserveStat', {0: false, 1: false, 2: false});
  Session.set('clickedPost', {});
  Session.set('reserveInfoErrors', {});



}

var POST_HEIGHT = 80;
var Positions = new Meteor.Collection(null); // null means local collection




Template.postItem.helpers({
  numberIdx: function() {
    return "idx_" + postNum;
  },
  getIn: function(arr) {
    console.log("getIncludeimages(): " + arr);
  },
  errorMessage: function(field) {
		return Session.get('reserveInfoErrors')[field];
	},
	errorClass: function (field) {
	  return !!Session.get('reserveInfoErrors')[field] ? 'has-error' : '';
	},
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

    // var seats = Session.get('availableSeats');
    // console.log("seats: " + seats);
    if (clickedId === id) {
      return true;
    } else {
      return false;
    }
  },
  getEventClicked: function() {
    var result = false;
    console.log("seats: " + Session.get('availableSeats'));
    if (Number(Session.get('availableSeats')) > 0)
      result = true;
    return result;
  }
});


Template.postItem.rendered = function(){
  console.log("POSTITEM RENDERED");
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
    var postId = e.target.className.split(' ').reverse()[0];
    console.log(postId);
    Session.set('clickedPost', postId);
    // Session.set('reserveStat', {0: true, 1: false, 2: false});
  },
  'click .reserve_confirm': function(e) {
    e.preventDefault();
    console.log("reserve confirm button clicked!");

    // TODO: 이미 예약한 사람은 다시 예약 할 수 없게 해야 하나?
    // var guestArr = [];
    var guestInfo = {
      name: document.getElementById('reserve_name').value,
      phone: document.getElementById('reserve_mobilePhone').value,
      seats: Number(document.getElementById('reserve_seats').value),
      reserve_id: Random.id()
    };

    console.log("guestInfo.name: " + guestInfo.name);
    console.log("guestInfo: " + guestInfo.phone);
    console.log("guestInfo: " + guestInfo.seats);

  	var errors = validateReservInfo(guestInfo);
    console.log(errors);
  	if (errors.reserve_name || errors.reserve_mobilePhone || errors.reserve_seats)
      return Session.set('reserveInfoErrors', errors);

    var eventID = Session.get('eventClicked');
    console.log("eventID: " + eventID);

    Meteor.call('guestInsert', eventID, guestInfo, function(error, result) {
      console.log("Meteor call - guestInsert()");
      // display the error to the user and abort
      if (error) {
        console.log("ERROR!!");
        console.log(error.reason);
        return throwError(error.reason);
      }

      console.log("result: " + result);
      // console.log(result._id);


      Router.go('reserveResult', {event_id: result._id});

    });

  },
  'click .statistic': function(e) {
    e.preventDefault();
    console.log("statistic button clicked!");
    // console.log(e.target.className);
    var postId = e.target.className.split(' ').reverse()[0];
    // console.log(postId);
    Session.set('clickedPost', postId);
    // Session.set('reserveStat', {0: true, 1: false, 2: false});


  },

});
