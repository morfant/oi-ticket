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
    return Posts.find();
  }

});


Template.postsList.rendered = function(){


}

