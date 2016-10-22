var imgs = [];
var imgIdx = [];
postNum = 0; //calculated by post_item.js

Template.playsList.created = function(){

}


Template.playsList.helpers({
	
});



Template.playsList.rendered = function(){

	console.log(postNum);

	// imgs = document.getElementsByClassName('slideImages');
	imgs = this.$('.slideImages');
	console.log(imgs);

	/* Prepare imgIdx[] */
	for (var i = 0; i < postNum; i++) {
		imgIdx[i] = 1;
	}

	/* Image Slide show */

	/* Show first image before setInterval */
	for (let i = 0; i < postNum; i++){
		imgs[i*3].style.display = "block";
	}
	

	console.log("SET INTERVAL");
    slideShowTimer = Meteor.setInterval(function imgSlide() {

		// console.log("imgSlide()!!");
		for (var j = 0; j < postNum; j++){

		    for (var i = 0; i < 3; i++) {
				imgs[i + (j*3)].style.display = "none";
				// console.log("idx: " + (i + (j*3)).toString());
			}

		    imgIdx[j]++;
		    if (imgIdx[j] > 3) {imgIdx[j] = 1}    
		    // console.log("imgIdx: " + imgIdx);
			// console.log("j*3-1: " + j);
		    imgs[imgIdx[j]-1 + (j*3)].style.display = "block";  

		};

    }, 2000);

    // console.log(slideShowTimer);


}


Template.playsList.destroyed = function () {
	console.log("CANCEL INTERVAL");
	Meteor.clearInterval(slideShowTimer);
};





