var postId = "";
var imgId;
var imgElements;
var imgIdx = 0;

// var interval = 5000;

// var imgSlide = function() {
// 	console.log("in imgSlide()");
//     var imgs = document.getElementsByClassName(this._id);
//     // console.log("imgs: " + imgs);
//     // console.log("img 1: " + imgs[0]);

//     for (var i = 0; i < imgs.length; i++) {
//        imgs[i].style.display = "none";  
//     }
//     // imgIdx++;
//     // if (imgIdx > imgs.length) {imgIdx = 1}    
//     // imgs[imgIdx-1].style.display = "block";  
//     // setTimeout(imgSlide, interval);
// }


Template.imageSlide.created = function() {
	// imgElements = null;
  
};


Template.imageSlide.rendered = function() {


	// console.log("imageSlide: this._id = " + this._id);
	// console.log("imageSlide: this._id = " + postId);
    // var imgs = document.getElementsByClassName(postId);
    // var imgs = this.find('[name=ybje7wDYT6ysFPCjK]');
    // console.log("imgs: " + imgs);
    // console.log("img 1: " + imgs[0].src);

	// imgSlide();

};


Template.imageSlide.helpers({
	addPath: function(src) {
		if (src) {
			var addPathSrc = UPLOAD_DIR + src;
			console.log(addPathSrc);
			return addPathSrc;
		} else {
			return null;
		}
	},
	getImgId: function(id) {
		imgId = id;
		console.log("imgID: " + postId);
	},
	getPostId: function(id) {
		postId = id;
		console.log("ID: " + postId);
	},
	getImgElements: function(id){
		// var test = document.body();
		// console.log(test);
	    // imgElements = document.getElementsByClassName(id.toString());
	    // console.log("id: " + id);
	    // console.log(imgElements[0]);
	},
});

Template.imageSlide.events({

});

