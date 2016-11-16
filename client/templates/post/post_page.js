var includeImages_postPage = [];

Template.postPage.created = function(){
    // console.log("postPage")
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

  for (var i = 0; i < maxNum; i++) {
    imgs[i].src = UPLOAD_DIR + includeImages_postPage[i];
	}

	console.log("SET INTERVAL - postPage");
  slideShowTimer_OnPostPage = Meteor.setInterval(function imgSlide_OnPostPage() {

    for (var i = 0; i < maxNum; i++) {
			imgs[i].style.display = "none";
		}

    imgIdx++;
    if (imgIdx >= maxNum) {imgIdx = 0}
    // console.log("imgIdx: " + imgIdx);
    imgs[imgIdx].style.display = "block";

  }, 2000);

    // console.log(slideShowTimer);


}


Template.postPage.destroyed = function () {
	console.log("CANCEL INTERVAL - postPage");
	Meteor.clearInterval(slideShowTimer_OnPostPage);
};
