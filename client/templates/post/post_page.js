Template.postPage.created = function(){
    // console.log("postPage")
}

Template.postPage.helpers({

});

Template.postPage.events({
    
})


Template.postPage.rendered = function(){

	var imgs = this.$('.slideImages');
	// console.log(imgs);

	/* Prepare imgIdx */
	var imgIdx = 0;

	/* Show first image before setInterval */
	imgs[0].style.display = "block";
	
	console.log("SET INTERVAL - postPage");
    slideShowTimer_OnPostPage = Meteor.setInterval(function imgSlide_OnPostPage() {

		// console.log("imgSlide()!!");
		// for (var j = 0; j < postNum; j++){

		    for (var i = 0; i < 3; i++) {
				imgs[i].style.display = "none";
				// console.log("idx: " + (i + (j*3)).toString());
			}

		    imgIdx++;
		    if (imgIdx > 2) {imgIdx = 0}    
		    // console.log("imgIdx: " + imgIdx);
		    imgs[imgIdx].style.display = "block";  

		// };

    }, 2000);

    // console.log(slideShowTimer);


}


Template.postPage.destroyed = function () {
	console.log("CANCEL INTERVAL - postPage");
	Meteor.clearInterval(slideShowTimer_OnPostPage);
};

