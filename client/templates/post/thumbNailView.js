Template.thumbNailView.created = function() {

};


Template.thumbNailView.rendered = function() {
  // this.find('img').attr('src') =
  // this.find('#onNow').checked = true;


};


Template.thumbNailView.helpers({
  setParaIdx : function() {
    var pIdx = "t_p_" + thumbNailImgIdx;
    return pIdx;
  },
  setDelIdx : function() {
    var delIdx = "del_" + thumbNailImgIdx;
    return delIdx;
  },
  setImgIdx : function() {
    var imgIdx = "t_img_" + thumbNailImgIdx;
    return imgIdx;
  },
  nextIdx: function() {
    thumbNailImgIdx++;
  }


});

Template.thumbNailView.events({


});
