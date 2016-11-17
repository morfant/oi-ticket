var includeImages_imageSlide = [];

Template.imageSlide.created = function() {

};


Template.imageSlide.rendered = function() {

};


Template.imageSlide.helpers({
  getSrcs: function(srcs) {
    includeImages_imageSlide = srcs;
    console.log("srcs");
    console.log(srcs);
  },
	addPath: function(src) {
		if (src) {
			var addPathSrc = UPLOAD_DIR + src;
			console.log(addPathSrc);
			return addPathSrc;
		} else {
			return null;
		}
	},
});

Template.imageSlide.events({

});
