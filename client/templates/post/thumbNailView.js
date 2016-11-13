Template.thumbNailView.created = function() {

};


Template.thumbNailView.rendered = function() {

};


Template.thumbNailView.helpers({

  setDelIdx : function() {
    var delIdx = "del_" + thumbNailImgIdx;
    return delIdx;
    thumbNailImgIdx++;
  }

});

Template.thumbNailView.events({

});
