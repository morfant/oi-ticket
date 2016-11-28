var includeImages_postPage = [];

Template.postPage.created = function(){
  // loadSlideInterval() is defined settings.js
	var slideTime = loadSlideInterval();
  Session.set('slideShowTime', slideTime); //milli second
}

Template.postPage.helpers({
  getIncludeimages: function(arr) {
    console.log("getIncludeimages(): " + arr);
    includeImages_postPage = arr;
  },
});

Template.postPage.events({

})


Template.postPage.rendered = function(){

  console.log("POSTPAGE RENDERED");

	/* Image Slide show */
  var imgIdx = 0;
	var imgs = document.getElementsByClassName("slideImages");
  var maxNum = imgs.length;

	/* Show first image before setInterval */
	imgs[imgIdx].style.display = "block";

	console.log("SET INTERVAL - postPage");
  slideShowTimer_OnPostPage = Meteor.setInterval(function imgSlide_OnPostPage() {

    for (var i = 0; i < maxNum; i++) {
			imgs[i].style.display = "none";
		}

    imgIdx++;
    if (imgIdx >= maxNum) {imgIdx = 0}
    // console.log("imgIdx: " + imgIdx);
    imgs[imgIdx].style.display = "block";

  }, Session.get('slideShowTime')); //milli second

    // console.log(slideShowTimer);


}


Template.postPage.destroyed = function () {
	console.log("CANCEL INTERVAL - postPage");
	Meteor.clearInterval(slideShowTimer_OnPostPage);
};
