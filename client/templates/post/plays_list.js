var imgs = [];
var imgIdx = [];
postNum = 0; //calculated by post_item.js

Template.playsList.created = function(){
  // loadSlideInterval() is defined settings.js
	var slideTime = loadSlideInterval();
  Session.set('slideShowTime', slideTime); //milli second
}


Template.playsList.helpers({

});



Template.playsList.rendered = function(){

	console.log("postNum in play_list.js: " + postNum);

	/* Prepare imgIdx[] */
	for (var i = 0; i < postNum; i++) {
		imgIdx[i] = 1;
	}

	/* Image Slide show */
	var maxNum = [];
	var imgSets = document.getElementsByClassName("_images");
	// console.log("imgSets length: " + imgSets.length);
	for (var i = 1; i <= imgSets.length; i++) {
		// console.log(document.getElementsByClassName("idx_"+i));
		var slideImgs = document.getElementsByClassName("idx_"+i);
		// console.log(slideImgs);
		var imgNum = slideImgs.length;
		imgs[i-1] = slideImgs;
		// console.log("imgNum: " + imgNum);
		maxNum[i-1] = imgNum;
		// maxNum[i-1] = document.getElementsByClassName("slideImages").length;
		// console.log("maxNum[" + (i-1) + "]: " + maxNum[i-1]);
		// console.log(imgs);
	}

	/* Show first image before setInterval */
	for (let i = 0; i < postNum; i++){
		if (maxNum[i] != 0) {
			imgs[i][0].style.display = "block";
		}
	}


	console.log("SET INTERVAL");
  slideShowTimer = Meteor.setInterval(function imgSlide() {

	// console.log("imgSlide()!!");
		for (var i = 0; i < postNum; i++){
			if (maxNum[i] != 0) {
				for (var j = 0; j < maxNum[i]; j++){ //6 is the least common multiple of 2, 3
					imgs[i][j].style.display = "none";
				}

		    imgIdx[i]++;
		    if (imgIdx[i] > maxNum[i]) {imgIdx[i] = 1}
		    // console.log("imgIdx: " + imgIdx);
			// console.log("j*3-1: " + j);
		    imgs[i][imgIdx[i]-1].style.display = "block";
			}
		};

  }, Session.get('slideShowTime')); //milli second

  // console.log(slideShowTimer);


};


Template.playsList.destroyed = function () {
	console.log("CANCEL INTERVAL");
	Meteor.clearInterval(slideShowTimer);
	postNum = 0;
};
