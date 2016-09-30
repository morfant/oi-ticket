Template.postsList.created = function(){
	postNum = 0;

	// if (slideShowTimer != undefined) Meteor.clearInterval(slideShowTimer); //cancel previous setInterval

}


// //Set data first!!!
// var PostsData = [
//     {
//         title: '#1',
//         contents: 'hello',
//         isOnNow: true,
//         isUpNext: false,
//         isLasts: false,
//         date: "20160712"
//     },

//     {
//         title: '#2',
//         contents: 'http://jjwc.cafe24.com:8000/mpd.ogg',
//         isOnNow: false,
//         isUpNext: true,
//         isLasts: false,
//         date: "20160712"
//     },

//     {
//         title: '#3',
//         contents: 'http://jjwc.cafe24.com:8000/mpd.ogg',
//         isOnNow: false,
//         isUpNext: false,
//         isLasts: true,
//         date: "20160712"
//     }
// ];



Template.postsList.helpers({
  posts: function() {
    // return Posts.find({}, {sort: {submitted: -1}});
    var p = Posts.find();
    for (var i = 0; i < p.count(); i++){
    	console.log(i + " / " + p.fetch()[i]._id);
    };
    // return Posts.find();
    return p;
  }

});


	// var imgSlide = function(imgs) {

	// 	console.log("imgSlide()");
	// 	// for (var j = 0; j < postNum; j++){

	// 	//     for (var i = 0; i < 3; i++) {
	// 	// 		imgs[i + (j*3)].style.display = "none";
	// 	// 	}

	// 	//     imgIdx[j]++;
	// 	//     if (imgIdx[j] > 3) {imgIdx[j] = 1}    
	// 	//     imgs[imgIdx[j]-1].style.display = "block";  

	// 	// };

	//     Meteor.setTimeout(imgSlide(images), 5000); // Change image every 2 seconds
	// };


Template.postsList.rendered = function(){

	console.log(postNum);

	// var imgs = this.find('[name=sImg]');
	imgs = document.getElementsByClassName('slideImages');
	console.log(imgs);
	// var realImgs = [];
	// var j = 0;

	// for (var i = 0; i < imgs.length; i++){
	// 	if (imgs[i].src != ''){
	// 		realImgs[j] = imgs[i];
	// 		j++;
	// 	}
	// 	console.log(imgs[i].src);
	// }

	// imgs = []; //empty array

	// console.log(realImgs);



	/* Image Slide show */
	imgIdx = [];
	for (var i = 0; i < postNum; i++) {
		imgIdx[i] = 0;
	}

	console.log("imgIdx: " + imgIdx);

	interval = 2000;


    slideShowTimer = Meteor.setInterval(function imgSlide() {

		console.log("imgSlide()");
		for (var j = 0; j < postNum; j++){

		    for (var i = 0; i < 3; i++) {
				imgs[i + (j*3)].style.display = "none";
				console.log("idx: " + (i + (j*3)).toString());
			}

		    imgIdx[j]++;
		    if (imgIdx[j] > 3) {imgIdx[j] = 1}    
		    console.log("imgIdx: " + imgIdx);
			console.log("j*3-1: " + j);
		    imgs[imgIdx[j]-1 + (j*3)].style.display = "block";  

		};

    }, 2000);

    console.log(slideShowTimer);
	// imgSlide(images);


}

