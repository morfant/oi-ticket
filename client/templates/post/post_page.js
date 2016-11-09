Template.postPage.created = function(){
    // console.log("postPage")
}

Template.postPage.helpers({

});

Template.postPage.events({

})


Template.postPage.rendered = function(){


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

  }, 2000);

    // console.log(slideShowTimer);


}


Template.postPage.destroyed = function () {
	console.log("CANCEL INTERVAL - postPage");
	Meteor.clearInterval(slideShowTimer_OnPostPage);
};
