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
	var post_page_imgs = document.getElementsByClassName("slideImages");
  var maxNum = post_page_imgs.length;
	// console.log(maxNum);
	
	if (maxNum > 0) {
		/* Hide all images */
	  for (var i = 0; i < maxNum; i++) {
			post_page_imgs[i].style.display = "none";
		}

		console.log("SET INTERVAL - postPage");

		/* Show first image before setInterval */
    post_page_imgs[imgIdx].style.display = "block";

	  slideShowTimer_OnPostPage = Meteor.setInterval(function imgSlide_OnPostPage() {

	    for (var i = 0; i < maxNum; i++) {
				post_page_imgs[i].style.display = "none";
			}

	    imgIdx++;
	    if (imgIdx >= maxNum) {imgIdx = 0}
	    post_page_imgs[imgIdx].style.display = "block";


	  }, Session.get('slideShowTime')); //milli second

	  console.log(slideShowTimer);
	}


}


Template.postPage.destroyed = function () {
	console.log("CANCEL INTERVAL - postPage");
	Meteor.clearInterval(slideShowTimer_OnPostPage);
};
